import Home from "@/src/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import nock from "nock";

const queryClient = new QueryClient();

describe("Home", () => {
  it("renders a heading", () => {
    nock("http://localhost:8000")
      .post("/graphql")
      .reply(200, {
        data: {
          userSelf: {
            username: "admin",
            name: "",
          },
        },
      });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
