import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/", // Substitua pela URL do seu servidor GraphQL
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          mockActivities: {
            keyArgs: ["user"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  devtools: {
    enabled: true,
  },
});

export default client;
