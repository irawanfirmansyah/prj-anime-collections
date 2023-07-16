import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graphql.anilist.co",
    fetchOptions: {
      method: "POST",
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
