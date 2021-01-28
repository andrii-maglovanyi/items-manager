import { gql } from "@apollo/client";

/** Items queries */

export const GET_ITEMS_QUERY = gql`
  query GetItems {
    items {
      id
      title
      user {
        fullName
      }
    }
  }
`;

/** Auth queries */

export const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUser {
    loggedInUser {
      id
      email
      fullName
    }
  }
`;
