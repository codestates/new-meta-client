import { ApolloClient, gql, InMemoryCache, makeVar } from "@apollo/client";

interface IToken {
  token: string;
}

export const TokenVar = makeVar<IToken | null>(null);

export const GET_CURRENT_USER = gql`
  query {
    token @client
  }
`;

const cashe = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        token() {
          return TokenVar();
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: cashe,
});

export default client;
