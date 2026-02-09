import { gql } from "@apollo/client";

const GET_ACTIVITIES = gql`
  query GetActivities {
    activities {
      id
      time
      type
      distance
      calories
      bpm
      user
      userImage
      likes
      comments
      imageUrl
    }
  }
`;

const GET_ACTIVITY_BY_TYPE = gql`
  query GetActivityByType($type: String!) {
    activitiesByType(type: $type) {
      id
      time
      type
      distance
      calories
      bpm
      user
      userImage
      likes
      comments
      imageUrl
    }
  }
`;

const GET_ACTIVITY_BY_USER = gql`
  query GetActivityByUser($user: String!) {
    activitiesByUser(user: $user) {
      id
      time
      type
      distance
      calories
      bpm
      user
      userImage
      likes
      comments
      imageUrl
    }
  }
`;

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    activities {
      type
    }
  }
`;

export {
  GET_ACTIVITIES,
  GET_ACTIVITY_BY_TYPE,
  GET_ACTIVITY_BY_USER,
  GET_ALL_CATEGORIES,
};
