import { GET_ANIME_LIST } from "@/lib/api";
import { useQuery } from "@apollo/client";
import React from "react";

const AnimeList = () => {
  const { loading, data } = useQuery(GET_ANIME_LIST, {
    variables: { page: 1, perPage: 10 },
  });

  if (loading || data === undefined) {
    return (
      <div style={{ padding: "4rem" }}>
        <h2>Loading . . .</h2>
      </div>
    );
  }
  if (data.Page?.media) {
    <ul>
      {data.Page.media.map((v) => (
        <li key={v?.id}>{v?.title?.romaji}</li>
      ))}
    </ul>;
  }
  return null;
};

export default AnimeList;
