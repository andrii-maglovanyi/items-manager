import { gql } from "@apollo/client";

/** Items mutations */

export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($title: String!) {
    create(title: $title) {
      id
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItemMutation($id: ID!, $title: String!) {
    update(id: $id, title: $title) {
      id
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation Delete($id: ID!) {
    delete(id: $id)
  }
`;

/** Auth mutations */

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      email
      fullName
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      fullName
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout
  }
`;
