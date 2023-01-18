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
mutation createTopic($title: String!, $url: String! $text: String!, $image: String!, $link: String!) {
    createTopic(title: $title, url: $url, text: $text, image: $image, link: $link) {
        title
        url
        text
        link
        image
        resources {
            _id
            title
            image
            link
        }
        subtopics {
            title
            text
            resources {
                _id
                title
                text
                image
                link
            }
        }
    }
}
`;

export const CREATE_SUBTOPIC = gql`
mutation createSubtopic($title: String!, $text: String!) {
    createSubtopic(title: $title, text: $text) {
        title
        text
        resources {
            _id
            title
            text
            image
            link
        }
    }
}
`;

export const CREATE_RESOURCE = gql`
mutation createResource($title: String!, $text: String!, $image: String!, $link: String!) {
    createResource(title: $title, text: $text, image: $image, link: $link){
        _id
        title
        text
        image
        link
    }
}
`;

export const ADD_RESOURCE_TO_TOPIC = gql`
mutation addResourceToTopic($_id: ID!, $title: String!, $text: String!, $image: String!, $link: String!, $topicId: ID!) {
    addResourceToTopic(_id: $_id, title: $title, text: $text, image: $image, link: $link, topicId: $topicId){
        resources {
            _id
            title
            text
            image
            link
        }
    }
}
`;


// export const ADD_RESOURCE_TO_SUBTOPIC = gql`
// mutation addResourceToTopic($_id: ID!, $title: String!, $url: String!, $text: String!, $image: String!, $link: String!) {
//     addResourceToTopic(_id: $_id, title: $title, url: $url, text: $text, image: $image, link: $link){
//         _id
//         resources {
//             _id
//             title
//             url
//             text
//             image
//             link
//         }
//     }
// }
// `;

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

// export const UPDATE_SUBTOPIC = gql`

// `;

// export const UPDATE_RESOURCE = gql`

// `;






// export const ADD_TO_LIST = gql`

// `;