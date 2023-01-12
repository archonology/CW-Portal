import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
      admin {
        _id
        username
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
      }
    }
  }
`;

export const CREATE_ADMIN = gql`
mutation createAdmin($username: String!, $email: String!, $password: String!) {
    createAdmin(username: $username, email: $email, password: $password) {
        token
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
mutation createTopic($topic: String!, $url: String! $text: String!, $image: String!) {
    createTopic(topic: $topic, url: $url, text: $text, image: $image) {
        topic
        url
        text
        image
        resources {
            _id
            title
            url
            text
            image
            link
        }
    }
}
`;

export const CREATE_SUBTOPIC = gql`
mutation createSubtopic($title: String!, $url: String! $text: String!) {
    createSubtopic(title: $title, url: $url, text: $text) {
        title
        url
        text
        resources {
            _id
            title
            url
            text
            image
            link
        }
    }
}
`;

export const CREATE_RESOURCE = gql`
mutation createResource($title: String!, $url: String!, $text: String!, $image: String!, $link: String!) {
    createResource(title: $title, url: $url, text: $text, image: $image, link: $link){
        _id
        title
        url
        text
        image
        link
    }
}
`;

export const ADD_RESOURCE_TO_TOPIC = gql`
mutation addResourceToTopic($_id: ID!, $title: String!, $url: String!, $text: String!, $image: String!, $link: String!) {
    addResourceToTopic(_id: $_id, title: $title, url: $url, text: $text, image: $image, link: $link){
        _id
        topic
        resources {
            _id
            title
            url
            text
            image
            link
        }
    }
}
`;


export const ADD_RESOURCE_TO_SUBTOPIC = gql`
mutation addResourceToTopic($_id: ID!, $title: String!, $url: String!, $text: String!, $image: String!, $link: String!) {
    addResourceToTopic(_id: $_id, title: $title, url: $url, text: $text, image: $image, link: $link){
        _id
        title
        resources {
            _id
            title
            url
            text
            image
            link
        }
    }
}
`;

// export const UPDATE_SUBTOPIC = gql`

// `;

// export const UPDATE_RESOURCE = gql`

// `;

// export const DELETE_TOPIC = gql`

// `;

// export const DELETE_SUBTOPIC = gql`

// `;

// export const DELETE_RESOURCE = gql`

// `;

// export const ADD_TO_LIST = gql`

// `;