import { COLORS } from "@/constants/colors";
import { useAnimeListPageContext } from "@/contexts";
import { GET_ANIME_LIST } from "@/lib/api";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import AnimeListPagination from "./AnimeListPagination";
import Container from "../Container/Container";

const AnimeList = () => {
  const animeListPageCtx = useAnimeListPageContext();

  const page = animeListPageCtx?.page || 1;
  const { loading, data } = useQuery(GET_ANIME_LIST, {
    variables: {
      page,
      perPage: 10,
      asHtml: false,
    },
  });

  const renderContent = () => {
    if (loading || data === undefined) {
      return (
        <div style={{ padding: "4rem" }}>
          <h2>Loading . . .</h2>
        </div>
      );
    }

    if (data.Page?.media) {
      return (
        <>
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <h3 css={{ fontSize: "2rem" }}>Anime List</h3>
            <button
              css={{
                backgroundColor: COLORS.black,
                color: COLORS.white,
                padding: ".5rem .875rem",
                borderRadius: ".875rem",
                fontSize: "1rem",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Select
            </button>
          </div>
          <div
            css={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
              "@media (max-width:960px)": {
                gridTemplateColumns: "repeat(2, minmax(200px, 1fr))",
              },
              "@media (max-width:600px)": {
                gridTemplateColumns: "auto",
              },
              "& > a:not(:last-child)": {
                marginBottom: ".5rem",
              },
            }}
          >
            {data.Page.media.map((m, i) => (
              <Link
                css={{
                  display: "block",
                }}
                key={m?.id}
                href={{
                  pathname: "/anime/details",
                  query: {
                    id: m?.id,
                  },
                }}
              >
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: ".5rem",
                    border: `1px solid ${COLORS.black}`,
                    borderRadius: "1rem",
                    padding: "1rem",
                    alignItems: "center",
                    height: "100%",
                    ":hover": {
                      backgroundColor: COLORS.lightBlue,
                    },
                  }}
                >
                  <h4 css={{ fontSize: "1.25rem", textAlign: "center" }}>
                    {m?.title?.romaji}
                  </h4>
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "1rem",
                      position: "relative",
                    }}
                  >
                    <Image
                      css={{
                        alignSelf: "start",
                      }}
                      src={
                        m?.coverImage?.extraLarge ||
                        "https://via.placeholder.com/56x56"
                      }
                      alt={`anime-logo-${i}`}
                      width={200}
                      height={200}
                    />
                    <p
                      css={{
                        alignSelf: "start",
                      }}
                    ></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <AnimeListPagination />
        </>
      );
    }
    return null;
  };

  return <Container>{renderContent()}</Container>;
};

export default AnimeList;
