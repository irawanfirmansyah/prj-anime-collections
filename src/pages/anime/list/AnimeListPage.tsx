import Head from "next/head";
import { AnimeList, Header } from "@/components";
import { AnimeListPageProvider, CollectionProvider } from "@/contexts";
import RootLayout from "@/components/RootLayout/RootLayout";

const AnimeListPage = () => {
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        <AnimeListPageProvider>
          <CollectionProvider>
            <Header />
            <AnimeList />
          </CollectionProvider>
        </AnimeListPageProvider>
      </RootLayout>
    </>
  );
};

export default AnimeListPage;
