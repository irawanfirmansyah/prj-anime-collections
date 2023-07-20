import { COLORS } from "@/constants/colors";
import { GET_ANIME_LIST_BY_IDS } from "@/lib/api";
import { Collection } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CollectionCard = ({
  collection,
  onClickRemove,
  onClickEditCollection,
}: {
  collection: Collection;
  onClickRemove: React.MouseEventHandler<HTMLButtonElement>;
  onClickEditCollection: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { data, loading } = useQuery(GET_ANIME_LIST_BY_IDS, {
    variables: { ids: Array.from(collection.animes) },
    skip: collection.animes.size <= 0,
  });

  const firstAnime = data?.Page?.media?.[0] || undefined;

  const bannerImgUrl =
    firstAnime?.coverImage?.extraLarge || "https://via.placeholder.com/200x200";

  return (
    <Link
      css={{
        display: "block",
      }}
      key={collection.id}
      href={{
        pathname: "/collection/details",
        query: {
          id: collection.id,
        },
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          border: `1px solid ${COLORS.black}`,
          borderRadius: "1rem",
          padding: "1rem",
          alignItems: "center",
          height: "100%",
          ":hover": {
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          },
        }}
      >
        <p css={{ fontSize: "1.25rem", textAlign: "center" }}>
          {collection.name}
        </p>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            columnGap: "1rem",
            position: "relative",
          }}
        >
          {loading ? (
            <div
              css={{
                width: "200px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Loading ...
            </div>
          ) : (
            <Image
              css={{
                alignSelf: "start",
              }}
              src={bannerImgUrl}
              alt={
                firstAnime
                  ? `anime-banner-${firstAnime.title?.romaji}`
                  : "default-banner"
              }
              width={200}
              height={200}
            />
          )}
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
          }}
        >
          <button
            onClick={onClickRemove}
            css={{
              minWidth: "5rem",
              border: "none",
              backgroundColor: COLORS.red,
              padding: ".5rem .875rem",
              color: COLORS.white,
              cursor: "pointer",
              borderRadius: ".75rem",
              fontWeight: 600,
              ":hover": {
                backgroundColor: COLORS.darkRed,
              },
            }}
          >
            Remove
          </button>
          <button
            onClick={onClickEditCollection}
            css={{
              minWidth: "5rem",
              border: "none",
              backgroundColor: COLORS.blue,
              padding: ".5rem .875rem",
              cursor: "pointer",
              borderRadius: ".75rem",
              color: COLORS.white,
              fontWeight: 600,
              ":hover": {
                backgroundColor: COLORS.darkBlue,
              },
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
