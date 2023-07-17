import Head from "next/head";
import { AnimeList, Header } from "@/components";
import { AnimeListPageProvider } from "@/contexts";
import RootLayout from "@/components/RootLayout/RootLayout";

const AnimeListPage = () => {
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        <AnimeListPageProvider>
          <Header />
          <AnimeList />
        </AnimeListPageProvider>
      </RootLayout>
    </>
  );
};

export default AnimeListPage;
