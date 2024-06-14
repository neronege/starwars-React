import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import React from 'react';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index', // Star Wars GraphQL API
  cache: new InMemoryCache(),
});
//React 18 ve sonrası için
const ApolloClientProvider: React.FC<React.PropsWithChildren>  = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloClientProvider;