import { Header } from "@/components";
import Container from "@/components/Container/Container";
import RootLayout from "@/components/RootLayout/RootLayout";
import { GET_ANIME_BY_ID } from "@/lib/api";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";

const AnimeDetailPage = () => {
  const router = useRouter();
  const animeId = Number(router.query.id) || null;
  const { data, loading } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: animeId },
    skip: animeId === null,
  });

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
          {parse(data?.Media?.description || "-")}
        </div>
        <div>
          <h3 css={{ marginBottom: "1rem" }}>No. of Episodes</h3>
          <p>{data?.Media?.episodes}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        {/* <AnimeListPageProvider> */}
        <Header />
        <Container>{renderContent()}</Container>
        {/* </AnimeListPageProvider> */}
      </RootLayout>
    </>
  );
};

export default AnimeDetailPage;
