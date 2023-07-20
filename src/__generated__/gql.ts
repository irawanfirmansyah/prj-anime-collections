/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery getAnimeList($id: Int, $page: Int, $perPage: Int, $search: String, $asHtml: Boolean) {\n  Page (page: $page, perPage: $perPage) {\n    pageInfo {\n      total\n      currentPage\n      lastPage\n      hasNextPage\n      perPage\n    }\n    media (id: $id, search: $search) {\n      id\n      title {\n        romaji\n      }\n      description (asHtml: $asHtml)\n      coverImage {\n        extraLarge\n        large\n        medium\n        color\n      }\n    }\n  }\n}\n": types.GetAnimeListDocument,
    "\nquery getAnimeById($id: Int, $asHtml: Boolean) {\n  Media (id: $id) {\n    id\n    title {\n      romaji\n    }\n    status\n    description (asHtml: $asHtml)\n    coverImage {\n      extraLarge\n      large\n      medium\n      color\n    }\n    episodes\n    genres\n    duration\n  }\n}\n": types.GetAnimeByIdDocument,
    "\nquery getAnimeListByIds($ids: [Int], $asHtml: Boolean) {\n  Page {\n    media (id_in: $ids) {\n      id\n      title {\n        romaji\n      }\n      status\n      description (asHtml: $asHtml)\n      coverImage {\n        extraLarge\n        large\n        medium\n        color\n      }\n      episodes\n      genres\n      duration\n    }\n  }\n}\n": types.GetAnimeListByIdsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getAnimeList($id: Int, $page: Int, $perPage: Int, $search: String, $asHtml: Boolean) {\n  Page (page: $page, perPage: $perPage) {\n    pageInfo {\n      total\n      currentPage\n      lastPage\n      hasNextPage\n      perPage\n    }\n    media (id: $id, search: $search) {\n      id\n      title {\n        romaji\n      }\n      description (asHtml: $asHtml)\n      coverImage {\n        extraLarge\n        large\n        medium\n        color\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery getAnimeList($id: Int, $page: Int, $perPage: Int, $search: String, $asHtml: Boolean) {\n  Page (page: $page, perPage: $perPage) {\n    pageInfo {\n      total\n      currentPage\n      lastPage\n      hasNextPage\n      perPage\n    }\n    media (id: $id, search: $search) {\n      id\n      title {\n        romaji\n      }\n      description (asHtml: $asHtml)\n      coverImage {\n        extraLarge\n        large\n        medium\n        color\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getAnimeById($id: Int, $asHtml: Boolean) {\n  Media (id: $id) {\n    id\n    title {\n      romaji\n    }\n    status\n    description (asHtml: $asHtml)\n    coverImage {\n      extraLarge\n      large\n      medium\n      color\n    }\n    episodes\n    genres\n    duration\n  }\n}\n"): (typeof documents)["\nquery getAnimeById($id: Int, $asHtml: Boolean) {\n  Media (id: $id) {\n    id\n    title {\n      romaji\n    }\n    status\n    description (asHtml: $asHtml)\n    coverImage {\n      extraLarge\n      large\n      medium\n      color\n    }\n    episodes\n    genres\n    duration\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getAnimeListByIds($ids: [Int], $asHtml: Boolean) {\n  Page {\n    media (id_in: $ids) {\n      id\n      title {\n        romaji\n      }\n      status\n      description (asHtml: $asHtml)\n      coverImage {\n        extraLarge\n        large\n        medium\n        color\n      }\n      episodes\n      genres\n      duration\n    }\n  }\n}\n"): (typeof documents)["\nquery getAnimeListByIds($ids: [Int], $asHtml: Boolean) {\n  Page {\n    media (id_in: $ids) {\n      id\n      title {\n        romaji\n      }\n      status\n      description (asHtml: $asHtml)\n      coverImage {\n        extraLarge\n        large\n        medium\n        color\n      }\n      episodes\n      genres\n      duration\n    }\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;