import { gql } from "@apollo/client";

export const CREATE_ACTIVITY = gql`
  mutation AddActivity($input: ActivityInput!) {
    addActivity(input: $input) {
      distance
      calories
    }
  }
`;
