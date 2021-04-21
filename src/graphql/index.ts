import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

interface IToken {
  token: string;
}

export const TokenVar = makeVar<IToken | null>(null);

export const GET_CURRENT_USER = gql`
  query {
    token @client
  }
`;
// https://server.new-meta.ga:4000
const link = createHttpLink({
  uri: "http://localhost:4000/graphql", // ! EC2 배포시 변경하기
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

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
  link: authLink.concat(link),
  cache: cashe,
});

export default client;
