import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      adminToken
      admin {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_ADMIN = gql`
mutation createAdmin($username: String!, $email: String!, $password: String!) {
    createAdmin(username: $username, email: $email, password: $password) {
        adminToken
        admin {
            _id
            username
            email
        }
    }
}
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const CREATE_TOPIC = gql`
mutation createTopic($title: String!, $text: String!, $image: String!, $link: String!) {
    createTopic(title: $title, text: $text, image: $image, link: $link) {
        title
        text
        link
        image
    }
}
`;

export const CREATE_SUBTOPIC = gql`
mutation createSubtopic($title: String!, $text: String!, $doc: String!, $docModel: String!) {
    createSubtopic(title: $title, text: $text, doc: $doc, docModel: $docModel) {
        title
        text
        doc
        docModel

    }
}
`;

export const CREATE_RESOURCE = gql`
mutation createResource($title: String!, $text: String!, $image: String!, $link: String!, $doc: String!, $docModel: String!) {
    createResource(title: $title, text: $text, image: $image, link: $link, doc: $doc, docModel: $docModel){
        _id
        title
        text
        image
        link
        doc
        docModel
    }
}
`;

export const UPDATE_RESOURCE = gql`
mutation updateResource($_id: ID!, $title: String!, $text: String!, $image: String!, $link: String!) {
  updateResource(_id: $_id, title: $title, text: $text, image: $image, link: $link){
        _id
        title
        text
        image
        link
        doc
        docModel
    }
}
`;


export const DELETE_RESOURCE = gql`
mutation deleteResource($_id: ID!) {
    deleteResource(_id: $_id) {
      _id
    }
  }
`;

export const DELETE_SUBTOPIC = gql`
mutation deleteSubtopic($_id: ID!) {
    deleteSubtopic(_id: $_id) {
      _id
    }
  }
`;

export const DELETE_TOPIC = gql`
mutation deleteTopic($_id: ID!) {
    deleteTopic(_id: $_id) {
      _id
    }
  }
`;
