import React from "react";
import { Container } from "@/components";
import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_LIST_BY_IDS } from "@/lib/api";
import { useCollectionContext } from "@/contexts";
import { useRouter } from "next/router";
import Image from "next/image";

const CollectionDetails = () => {
  const router = useRouter();
  const collectionId = router.query.id ? String(router.query.id) : "";
  const collectionCtx = useCollectionContext();

  const [getAnimeList, { loading, data }] = useLazyQuery(GET_ANIME_LIST_BY_IDS);

  React.useEffect(() => {
    if (router.isReady && collectionCtx && collectionId) {
      const collection = collectionCtx.getCollection(collectionId);
      if (collection) {
        getAnimeList({ variables: { ids: collection.animes } });
      }
    }
  }, [collectionCtx, collectionId, getAnimeList, router]);

  const renderContent = () => {
    if (!data || loading) {
      return (
        <div style={{ padding: "4rem" }}>
          <h2>Loading . . .</h2>
        </div>
      );
    }

    return (
      <div
        css={{
          display: "grid",
          rowGap: "1rem",
          "& > *:not(:last-child)": {
            marginBottom: "1rem",
          },
        }}
      >
        <h2>{data?.Media?.title?.romaji}</h2>
        <Image
          css={{ alignSelf: "start" }}
          src={
            data?.Media?.coverImage?.extraLarge ||
            "https://via.placeholder.com/56x56"
          }
          alt={`anime-logo-${data?.Media?.title}`}
          width={300}
          height={300}
        />
        <div>
          <h3 css={{ marginBottom: "1rem" }}>Description</h3>
          {/* {parse(data?.Media?.description || "-")} */}
        </div>
        <div>
          <h3 css={{ marginBottom: "1rem" }}>No. of Episodes</h3>
          <p>{data?.Media?.episodes}</p>
        </div>
        <div>
          <h3 css={{ marginBottom: "1rem" }}>Genres</h3>
          <p>{data?.Media?.genres?.join(", ")}</p>
        </div>
      </div>
    );
  };

  return <Container>{renderContent()}</Container>;
};

export default CollectionDetails;
