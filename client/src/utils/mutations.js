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
        resources {
            _id
            title
            image
            link
        }
        subtopics {
            _id
            title
            text
            image
            link
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

export const ADD_RESOURCE_TO_FAVS = gql`
mutation addResourceToFavs($_id: ID!, $title: String!, $text: String!, $image: String!, $link: String!) {
    addResourceToFavs(_id: $_id, title: $title, text: $text, image: $image, link: $link){
        favorites {
            _id
            title
            text
            image
            link
        }
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
    }
}
`;

export const UPDATE_SUBTOPIC = gql`
mutation updateSubtopic($_id: ID!, $title: String!, $text: String!, $image: String!, $link: String!) {
    updateSubtopic(_id: $_id, title: $title, text: $text, image: $image, link: $link){
        _id
        title
        text
        image
        link
    }
}
`;

export const UPDATE_TOPIC = gql`
mutation updateTopic($_id: ID!, $title: String!, $text: String!, $image: String!, $link: String!) {
    updateTopic(_id: $_id, title: $title, text: $text, image: $image, link: $link){
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

export const ADD_RESOURCE_TO_SUBTOPIC = gql`
mutation addResourceToSubtopic($_id: ID!, $title: String!, $text: String!, $image: String!, $link: String!, $subtopicId: ID!) {
  addResourceToSubtopic(_id: $_id, title: $title, text: $text, image: $image, link: $link, subtopicId: $subtopicId){
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

export const ADD_SUBTOPIC_TO_TOPIC = gql`
mutation addSubtopicToTopic($_id: ID!, $title: String!, $text: String!, $topicId: ID!) {
  addSubtopicToTopic(_id: $_id, title: $title, text: $text, topicId: $topicId){
        subtopics {
            _id
            title
            text
            image
            link
        }
    }
}
`;


export const REMOVE_RESOURCE_FROM_FAVS = gql`
mutation removeResourceFromFavs($_id: ID!) {
    removeResourceFromFavs(_id: $_id){
        favorites {
            _id
        }
    }
}
`;


export const REMOVE_RESOURCE_FROM_TOPIC = gql`
mutation removeResourceFromTopic($_id: ID!, $topicId: ID!) {
  removeResourceFromTopic(_id: $_id, topicId: $topicId){
        resources {
            _id
        }
    }
}
`;

export const REMOVE_RESOURCE_FROM_SUBTOPIC = gql`
mutation removeResourceFromSubTopic($_id: ID!, $subtopicId: ID!) {
  removeResourceFromSubTopic(_id: $_id, subtopicId: $subtopicId){
        resources {
            _id
        }
    }
}
`;

export const REMOVE_SUBTOPIC_FROM_TOPIC = gql`
mutation removeSubtopicFromTopic($_id: ID!, $topicId: ID!) {
    removeSubtopicFromTopic(_id: $_id, topicId: $topicId){
        subtopics {
            _id
        }
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
