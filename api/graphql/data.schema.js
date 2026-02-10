// Dados de exemplo de usuários e atividades
export const users = [
  { id: 1, username: "user1", email: "user1@example.com" },
  { id: 2, username: "user2", email: "user2@example.com" },
  { id: 3, username: "user3", email: "user2@example.com" },
];

export const activities = [
  {
    id: 1,
    time: "07:00",
    type: "Pilates",
    distance: "5",
    calories: "300",
    bpm: "120",
    user: "user1",
    userImage:
      "https://avatars.githubusercontent.com/u/68503415?s=400&u=961cb483c912c8c3a6ce63c9ed8793a79b81ac61&v=4",
    likes: 10,
    comments: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    time: "08:00",
    type: "Ciclismo",
    distance: "10",
    calories: "500",
    bpm: "110",
    user: "user2",
    userImage:
      "https://avatars.githubusercontent.com/u/68503415?s=400&u=961cb483c912c8c3a6ce63c9ed8793a79b81ac61&v=4",
    likes: 20,
    comments: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1480264104733-84fb0b925be3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    time: "08:00",
    type: "Natação",
    distance: "10",
    calories: "500",
    bpm: "110",
    user: "user2",
    userImage:
      "https://avatars.githubusercontent.com/u/68503415?s=400&u=961cb483c912c8c3a6ce63c9ed8793a79b81ac61&v=4",
    likes: 20,
    comments: 10,
    imageUrl:
      "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg",
  },
];

// Definição do esquema (schema)
export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

type Activity {
    id: ID!
    time: String!
    type: String!
    distance: String!
    calories: String!
    bpm: String!
    user: String!
    userImage: String!
    likes: Int!
    comments: Int!
    imageUrl: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    activities: [Activity]
    activity(id: ID!): Activity
    activitiesByType(type: String!): [Activity]
    activitiesByUser(user: String!): [Activity]
  }

  input ActivityInput {
    time: String!
    type: String!
    distance: String!
    calories: String!
    bpm: String!
    user: String!
    userImage: String!
    likes: Int!
    comments: Int!
    imageUrl: String!
  }

  type Mutation {
    addUser(username: String!, email: String!): User
    addActivity(
      input: ActivityInput!
    ): Activity
  }

  type Subscription {
    userAdded: User
    activityAdded: Activity
  }
`;
