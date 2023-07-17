import Head from "next/head";
import { Inter } from "next/font/google";
import { AnimeList, Header } from "@/components";
import { AnimeListPageProvider } from "@/contexts";

const inter = Inter({ subsets: ["latin"] });

const AnimeListPage = () => {
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <main className={`${inter.className}`}>
        <AnimeListPageProvider>
          <Header />
          <AnimeList />
        </AnimeListPageProvider>
      </main>
    </>
  );
};

export default AnimeListPage;
