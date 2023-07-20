import { COLORS } from "@/constants/colors";
import { useAnimeListPageContext } from "@/contexts";
import { GET_ANIME_LIST } from "@/lib/api";
import { useQuery } from "@apollo/client";
import React from "react";

const AnimeListPagination = () => {
  const animeListPageCtx = useAnimeListPageContext();

  const { data } = useQuery(GET_ANIME_LIST, {
    variables: {
      page: animeListPageCtx?.page || 1,
      perPage: 10,
      asHtml: false,
    },
  });

  const lastPage = data?.Page?.pageInfo?.lastPage || 0;

  if (!animeListPageCtx) {
    throw new Error("Anime list page provider is not provided.");
  }

  const { page, setPage } = animeListPageCtx;

  const currPagination = Math.ceil(page / 10);

  const renderPaginationContent = () => {
    const result: React.ReactNode[] = [
      <button
        key="prevPagination"
        css={{
          background: COLORS.white,
          border: `1px solid ${COLORS.black}`,
          borderRadius: "1rem",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          width: "2.75rem",
          height: "2.5rem",
          ":hover": {
            backgroundColor: COLORS.grey,
          },
        }}
        {...(page - 10 > 0 && {
          onClick: () => setPage(Math.max(1, Math.ceil(page - 10))),
        })}
      >
        {"<<"}
      </button>,
      <button
        key="prevPage"
        css={{
          background: COLORS.white,
          borderRadius: "1rem",
          fontSize: "1rem",
          border: `1px solid ${COLORS.black}`,
          fontWeight: 600,
          cursor: "pointer",
          width: "2.75rem",
          height: "2.5rem",
          ":hover": {
            backgroundColor: COLORS.grey,
          },
        }}
        {...(page - 1 > 0 && {
          onClick: () => setPage(page - 1),
        })}
      >
        {"<"}
      </button>,
    ];

    for (let i = 1; i <= 10; i++) {
      const curPage = i + (currPagination - 1) * 10;
      result.push(
        <button
          key={`page-${curPage}`}
          css={{
            background: page === curPage ? COLORS.grey : COLORS.white,
            borderRadius: "1rem",
            fontSize: "1rem",
            border: `1px solid ${COLORS.black}`,
            fontWeight: 600,
            cursor: "pointer",
            width: "2.75rem",
            height: "2.5rem",
            ":hover": {
              backgroundColor: COLORS.grey,
            },
          }}
          onClick={() => setPage(curPage)}
        >
          {curPage}
        </button>,
      );
    }

    result.push(
      <button
        key="nextPage"
        css={{
          background: COLORS.white,
          borderRadius: "1rem",
          fontSize: "1rem",
          border: `1px solid ${COLORS.black}`,
          fontWeight: 600,
          cursor: "pointer",
          width: "2.75rem",
          height: "2.5rem",
          ":hover": {
            backgroundColor: COLORS.grey,
          },
        }}
        {...(page < lastPage && {
          onClick: () => setPage(page + 1),
        })}
      >
        {">"}
      </button>,
    );

    result.push(
      <button
        key="nextPagination"
        css={{
          background: COLORS.white,
          border: `1px solid ${COLORS.black}`,
          borderRadius: "1rem",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          width: "2.75rem",
          height: "2.5rem",
          ":hover": {
            backgroundColor: COLORS.grey,
          },
        }}
        {...(page < lastPage && {
          onClick: () => setPage(Math.min(page + 10, lastPage)),
        })}
      >
        {">>"}
      </button>,
    );

    return result;
  };

  return (
    <div
      css={{
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: ".875rem",
        justifyContent: "right",
      }}
    >
      {renderPaginationContent()}
    </div>
  );
};

export default AnimeListPagination;
