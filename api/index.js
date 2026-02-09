import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { PubSub } from "graphql-subscriptions";
import { json } from "body-parser";
import cors from "cors"; // Importando o middleware CORS

// Resolvers
const pubsub = new PubSub();

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { username }) => users.find((user) => user.username === username),
    activities: () => activities,
    activity: (_, { id }) =>
      activities.find((activity) => activity.id === parseInt(id)),
  },
  Mutation: {
    addUser: (_, { username, email }) => {
      const newUser = {
        id: users.length + 1,
        username,
        email,
      };
      users.push(newUser);
      pubsub.publish("USER_ADDED", { userAdded: newUser });
      return newUser;
    },
    addActivity: (
      _,
      {
        time,
        type,
        distance,
        calories,
        bpm,
        user,
        userImage,
        likes,
        comments,
        imageUrl,
      },
    ) => {
      const newActivity = {
        id: activities.length + 1,
        time,
        type,
        distance,
        calories,
        bpm,
        user,
        userImage,
        likes,
        comments,
        imageUrl,
      };
      activities.push(newActivity);
      pubsub.publish("ACTIVITY_ADDED", { activityAdded: newActivity });
      return newActivity;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(["USER_ADDED"]),
    },
    activityAdded: {
      subscribe: () => pubsub.asyncIterator(["ACTIVITY_ADDED"]),
    },
  },
};

// Configuração do servidor Apollo com Subscriptions
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors()); // Adicionando middleware CORS
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use("/graphql", json(), expressMiddleware(server));

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`),
  );
}

startApolloServer(typeDefs, resolvers);
