import Head from "next/head";
import { CollectionList, Header } from "@/components";
import RootLayout from "@/components/RootLayout/RootLayout";
import { CollectionListPageProvider } from "@/contexts";

const CollectionListPage = () => {
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        <CollectionListPageProvider>
          <Header />
          <CollectionList />
        </CollectionListPageProvider>
      </RootLayout>
    </>
  );
};

export default CollectionListPage;
