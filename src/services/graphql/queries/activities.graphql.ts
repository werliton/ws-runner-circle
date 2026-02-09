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

export { GET_ACTIVITIES, GET_ACTIVITY_BY_TYPE };
