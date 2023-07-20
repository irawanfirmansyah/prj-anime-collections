import Image from "next/image";
import parse from "html-react-parser";
import { AnimeDetailsInfoProps } from "./types";
import { COLORS } from "@/constants/colors";
import Link from "next/link";

const AnimeDetailsInfo = ({
  title,
  coverImageUrl,
  description,
  episodes,
  genres,
  ctaContent,
  collectedIn,
  ...restProps
}: AnimeDetailsInfoProps) => {
  return (
    <div
      css={{
        display: "grid",
        rowGap: "1rem",
      }}
      {...restProps}
    >
      <p css={{ fontWeight: 600 }}>{title}</p>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "1rem",
          "@media (max-width: 700px)": {
            gridTemplateColumns: "auto",
          },
        }}
      >
        <Image
          css={{ alignSelf: "start" }}
          src={coverImageUrl || "https://via.placeholder.com/56x56"}
          alt={`anime-logo-${title}`}
          width={300}
          height={300}
        />
        <div
          css={{
            display: "grid",
            gap: "1rem",
            "@media (min-width:701px)": {
              gridTemplateColumns: "repeat(4,minmax(min-content,1fr))",
              gridTemplateAreas: `
              'description description description description'
              'description description description description'
              'episodes episodes collectionsInclude collectionsInclude'
              'genres genres collectionsInclude collectionsInclude'
              'cta cta . .'
              `,
            },
            "@media (max-width:700px)": {
              gridTemplateColumns: "1fr",
              gridTemplateAreas: `
              'description'
              'episodes'
              'genres'
              'collectionsInclude'
              'cta'
              `,
            },
          }}
        >
          <div css={{ gridArea: "description" }}>
            <p css={{ fontWeight: 600 }}>Description</p>
            <span css={{ fontSize: ".875rem" }}>{parse(description)}</span>
          </div>
          <div css={{ gridArea: "episodes" }}>
            <p css={{ fontWeight: 600 }}>No. of Episodes</p>
            <span css={{ fontSize: ".875rem" }}>{episodes}</span>
          </div>
          <div css={{ gridArea: "genres" }}>
            <p css={{ fontWeight: 600 }}>Genres</p>
            <span css={{ fontSize: ".875rem" }}>{genres.join(", ")}</span>
          </div>
          <div css={{ gridArea: "collectionsInclude" }}>
            <p css={{ fontWeight: 600 }}>Collections include the anime</p>
            <div
              css={{
                display: "flex",
                gap: ".5rem",
                marginTop: ".5rem",
                flexWrap: "wrap",
              }}
            >
              {collectedIn.length > 0
                ? collectedIn.map((c) => (
                    <Link
                      key={c.id}
                      css={{
                        display: "inline-block",
                        padding: ".25rem .75rem",
                        borderRadius: "1rem",
                        ":hover": {
                          textDecoration: "underline",
                        },
                        backgroundColor: COLORS.grey,
                      }}
                      href={{
                        pathname: "/collection/details",
                        query: { id: c.id },
                      }}
                    >
                      {c.collectionName}
                    </Link>
                  ))
                : "-"}
            </div>
          </div>
          <div css={{ gridArea: "cta" }}>{ctaContent}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsInfo;
