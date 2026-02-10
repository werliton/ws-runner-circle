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
    activitiesByUser: (_, { user }) =>
      activities.filter((activity) => activity.user === user),
  },
  Mutation: {
    addActivity: (_, { input }) => {
      const newActivity = {
        id: activities.length + 1,
        time: input.time,
        type: input.type,
        distance: input.distance,
        calories: input.calories,
        bpm: input.bpm,
        user: input.user,
        userImage: input.userImage,
        likes: input.likes,
        comments: input.comments,
        imageUrl: input.imageUrl,
      };
      activities.push(newActivity);
      return newActivity;
    },
    addUser: (_, { username, email, image }) => {
      const newUser = {
        id: users.length + 1,
        username,
        email,
        image,
      };
      users.push(newUser);
      return newUser;
    },
  },
  // Subscription: {
  //   userAdded: {
  //     subscribe: () => pubsub.asyncIterator(["USER_ADDED"]),
  //   },
  //   activityAdded: {
  //     subscribe: () => pubsub.asyncIterator(["ACTIVITY_ADDED"]),
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
