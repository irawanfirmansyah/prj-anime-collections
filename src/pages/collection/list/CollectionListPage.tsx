import Head from "next/head";
import { CollectionList, Header } from "@/components";
import RootLayout from "@/components/RootLayout/RootLayout";
import { CollectionProvider } from "@/contexts";

const CollectionListPage = () => {
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        <CollectionProvider>
          <Header />
          <CollectionList />
        </CollectionProvider>
      </RootLayout>
    </>
  );
};

export default CollectionListPage;
