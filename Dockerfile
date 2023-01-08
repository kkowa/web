# =============================================================================
# Core: Base
# =============================================================================
ARG NODE_VERSION=18.12

FROM node:${NODE_VERSION}-bullseye-slim AS base

# Application directory
ARG APP_HOME="/var/app"

# App user (worker) for manual UID and GID set; can't use 1000 as it is already used by node
ARG UID="1000"
ARG GID="1000"

# Node control variables
ENV NODE_ENV="production"

SHELL ["/bin/bash", "-c"]

# Install core tools
RUN apt update && apt install --no-install-recommends -y \
    curl \
    && apt purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

# Set default working directory
WORKDIR "${APP_HOME}"

# Remove user / group "node" from base image
RUN groupdel -f node && userdel -fr node

# Create app user and set as app owner
RUN groupadd --gid "${GID}" worker \
    && useradd  --system --uid "${UID}" --gid "${GID}" --create-home worker \
    && chown -R worker:worker "${APP_HOME}" /home/worker

# Copy source codes
COPY --chown=worker:worker . .

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 \
    CMD ["curl", "-fsSL", "localhost:3000/"]

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "start"]

# =============================================================================
# Core: Build
# =============================================================================
FROM base AS build

# Need to install dev deps too for build
ENV NODE_ENV="development"

WORKDIR /tmp/build

# Install node modules
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean --force

# Copy source codes
COPY . .

# Generate build
RUN yarn build

# =============================================================================
# Environment: Development
# =============================================================================
FROM base AS development

# Renew arg
ARG APP_HOME

# Separate as volume between host and docker environment
VOLUME ["${APP_HOME}/node_modules"]

# Install dev tools
RUN apt update && apt install --no-install-recommends -y \
    curl \
    git \
    gnupg2 \
    make \
    python3-pip \
    && apt purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

# Install pre-commit
RUN pip3 install --upgrade pip && pip install pre-commit

# Remove existing GPG setup from base image for VSC devcontainer
# NOTE: Seems VSC devcontainer not forwarding host GPG config if already exists in container
RUN rm -rf "${HOME}/.gnupg"

# Copy from build stage
COPY --from=build /tmp/build/node_modules ./node_modules
COPY --from=build /tmp/build/.next ./.next

# Copy script files to executable path
COPY --chown=worker:worker --chmod=755 ./scripts/docker-entrypoint.sh /usr/local/bin/

USER worker:worker

# =============================================================================
# Environment: Production
# =============================================================================
FROM base AS production

# Re-install production deps only as build stage contain all deps including dev-only
RUN yarn install --frozen-lockfile && yarn cache clean --force

# Copy generated build outputs
COPY --from=build /tmp/build/.next ./.next

# Copy script files to executable path
COPY --chown=worker:worker --chmod=755 ./scripts/docker-entrypoint.sh /usr/local/bin/

USER worker:worker
