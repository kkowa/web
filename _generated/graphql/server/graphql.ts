/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date with time (isoformat) */
  DateTime: any;
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  GlobalID: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type CreateDocumentInput = {
  data: Scalars['JSON'];
  folder: Scalars['String'];
};

/** Input data for `createDocuments` mutation */
export type CreateDocumentsInput = {
  documents: Array<CreateDocumentInput>;
};

export type CreateDocumentsOutput = {
  __typename?: 'CreateDocumentsOutput';
  documents: Array<Document>;
};

/** Document type to describe a collected data. */
export type Document = Node & {
  __typename?: 'Document';
  /** Creation datetime of folder. */
  created: Scalars['DateTime'];
  /** Document data in JSON format. */
  data?: Maybe<Scalars['JSON']>;
  /** Document folder it belongs to. */
  folder: Folder;
  id: Scalars['GlobalID'];
  /** Last modification datetime of folder. */
  lastModified: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  /** Contains the nodes in this connection */
  edges: Array<DocumentEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type DocumentEdge = {
  __typename?: 'DocumentEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Document;
};

/** Folder type to group documents. */
export type Folder = Node & {
  __typename?: 'Folder';
  /** Creation datetime of folder. */
  created: Scalars['DateTime'];
  /** Document folder it belongs to. */
  documents: DocumentConnection;
  id: Scalars['GlobalID'];
  /** Last modification datetime of folder. */
  lastModified: Scalars['DateTime'];
  /** Name of folder to display. */
  name: Scalars['String'];
  /** Folder's owner. */
  owner: User;
};


/** Folder type to group documents. */
export type FolderDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type FolderConnection = {
  __typename?: 'FolderConnection';
  /** Contains the nodes in this connection */
  edges: Array<FolderEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type FolderEdge = {
  __typename?: 'FolderEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Folder;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create bulk of documents. */
  createDocuments: CreateDocumentsOutput;
};


export type MutationCreateDocumentsArgs = {
  input: CreateDocumentsInput;
};

/** An object with a Globally Unique ID */
export type Node = {
  /** The Globally Unique ID of this object */
  id: Scalars['GlobalID'];
};

/** Information to aid in pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** List of documents in folders owned by user. */
  documents: DocumentConnection;
  /** List of user's folders. */
  folders: FolderConnection;
  /** Return current user information. */
  userSelf: User;
};


export type QueryDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryFoldersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Triggered new document created in user's folder. */
  documentCreated: Array<Document>;
};

/** Common user type. */
export type User = Node & {
  __typename?: 'User';
  dateJoined: Scalars['DateTime'];
  /** Folder's owner. */
  folders: FolderConnection;
  id: Scalars['GlobalID'];
  /** Last modification datetime of folder. */
  lastModified: Scalars['DateTime'];
  /** User's real name. */
  name: Scalars['String'];
  /** 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다. */
  username: Scalars['String'];
};


/** Common user type. */
export type UserFoldersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AboutMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutMeQuery = { __typename?: 'Query', userSelf: { __typename?: 'User', id: any, username: string, name: string } };


export const AboutMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"aboutMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AboutMeQuery, AboutMeQueryVariables>;