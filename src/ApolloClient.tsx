import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import React from 'react';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index', // Star Wars GraphQL API
  cache: new InMemoryCache(),
});
//React.PropsWithChildren bu bileşenin çocuk bileşenleri içerebileceğini belirtir.
//children: children prop'u, bu bileşenin içine yerleştirilen tüm alt bileşenleri temsil eder. 
//Bu, ApolloProvider tarafından sarmalanmış tüm bileşenlerin Apollo Client'ı kullanabileceği anlamına gelir.
const ApolloClientProvider: React.FC<React.PropsWithChildren>  = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloClientProvider;