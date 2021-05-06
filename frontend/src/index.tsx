import * as React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App";

const cache = new InMemoryCache();

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: process.env.REACT_APP_SERVER_URL,

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);