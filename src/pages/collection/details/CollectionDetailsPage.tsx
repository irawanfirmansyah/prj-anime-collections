import Head from "next/head";
import { AnimeList, Header } from "@/components";
import RootLayout from "@/components/RootLayout/RootLayout";

const CollectionDetails = () => {
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        <Header />
        <AnimeList />
      </RootLayout>
    </>
  );
};

export default CollectionDetails;
