import { gql } from "@/__generated__";

export const GET_ANIME_LIST = gql(`
query getAnimeList($id: Int, $page: Int, $perPage: Int, $search: String, $asHtml: Boolean) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji
      }
      description (asHtml: $asHtml)
      coverImage {
        extraLarge
        large
        medium
        color
      }
    }
  }
}
`);

export const GET_ANIME_BY_ID = gql(`
query getAnimeById($id: Int, $asHtml: Boolean) {
  Media (id: $id) {
    id
    title {
      romaji
    }
    status
    description (asHtml: $asHtml)
    coverImage {
      extraLarge
      large
      medium
      color
    }
    episodes
    genres
    duration
  }
}
`);

export const GET_ANIME_LIST_BY_IDS = gql(`
query getAnimeListByIds($ids: [Int], $asHtml: Boolean) {
  Page {
    media (id_in: $ids) {
      id
      title {
        romaji
      }
      status
      description (asHtml: $asHtml)
      coverImage {
        extraLarge
        large
        medium
        color
      }
      episodes
      genres
      duration
    }
  }
}
`);
