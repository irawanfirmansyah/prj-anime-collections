import { AnimeDetails, Header } from "@/components";
import RootLayout from "@/components/RootLayout/RootLayout";
import { CollectionProvider } from "@/contexts";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const AnimeDetailPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady && !router.query.id) {
      router.push({ pathname: "/anime/list" });
    }
  }, [router]);

  if (!router.isReady) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        <CollectionProvider>
          <Header />
          <AnimeDetails animeId={Number(String(router.query.id))} />
        </CollectionProvider>
      </RootLayout>
    </>
  );
};

export default AnimeDetailPage;
