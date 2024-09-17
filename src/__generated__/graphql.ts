/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Port = {
  __typename?: 'Port';
  assignee?: Maybe<Scalars['String']['output']>;
  assignmentNotes?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  modificationDate?: Maybe<Scalars['String']['output']>;
  portNumber: Array<Scalars['Int']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  registrationDate?: Maybe<Scalars['String']['output']>;
  serviceCode?: Maybe<Scalars['String']['output']>;
  serviceName?: Maybe<Scalars['String']['output']>;
  transportProtocol?: Maybe<Scalars['String']['output']>;
  unauthorizedUseReported?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  lastChecked: Scalars['Int']['output'];
  ports: Array<Port>;
};


export type QueryPortsArgs = {
  portNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type Get_PortsQueryVariables = Exact<{
  portNum: Scalars['Int']['input'];
}>;


export type Get_PortsQuery = { __typename?: 'Query', lastChecked: number, ports: Array<{ __typename?: 'Port', serviceName?: string | null, transportProtocol?: string | null, portNumber: Array<number>, description?: string | null }> };


export const Get_PortsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_PORTS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"portNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"portNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"portNum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceName"}},{"kind":"Field","name":{"kind":"Name","value":"transportProtocol"}},{"kind":"Field","name":{"kind":"Name","value":"portNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastChecked"}}]}}]} as unknown as DocumentNode<Get_PortsQuery, Get_PortsQueryVariables>;