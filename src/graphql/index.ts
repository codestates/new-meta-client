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

let domain: string | undefined;
if (process.env.NODE_ENV === "development") {
  domain = process.env.REACT_APP_LOCAL_SERVER_DOMAIN;
} else {
  domain = process.env.REACT_APP_EC2_SERVER_DOMAIN;
}

// https://server.new-meta.club:4000
const link = createHttpLink({
  uri: `${domain}/graphql`,
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
