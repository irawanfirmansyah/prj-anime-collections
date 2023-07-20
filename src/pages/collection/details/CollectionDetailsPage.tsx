import Head from "next/head";
import { CollectionDetails, Header } from "@/components";
import RootLayout from "@/components/RootLayout/RootLayout";
import { CollectionProvider } from "@/contexts";

const CollectionDetailsPage = () => {
  return (
    <>
      <Head>
        <title>Anime Collections App</title>
      </Head>
      <RootLayout>
        <CollectionProvider>
          <Header />
          <CollectionDetails />
        </CollectionProvider>
      </RootLayout>
    </>
  );
};

export default CollectionDetailsPage;
