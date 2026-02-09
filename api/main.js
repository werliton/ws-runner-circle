import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { activities, typeDefs, users } from "./graphql/data.schema.js";

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { username }) => users.find((user) => user.username === username),
    activities: () => activities,
    activity: (_, { id }) =>
      activities.find((activity) => activity.id === parseInt(id)),
    activitiesByType: (_, { type }) =>
      activities.filter((activity) =>
        activity.type.toLowerCase().includes(type.toLowerCase()),
      ),
    activitiesByUser: (_, user) =>
      activities.filter((activity) => activity.user === user),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
