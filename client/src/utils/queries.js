import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        favorites {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
        do {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
        doing {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
        done {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
    }
}
`;

export const QUERY_ADMIN = gql`
query admin {
    admin {
        _id
        username
        email
        favorites {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
        do {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
        doing {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
        done {
            _id: ID
            title: String
            text: String
            image: String
            link: String
        }
    }
}
`;

export const QUERY_ALL_TOPICS = gql`
query topics {
    topics {
      _id
      title
      url
      text
      link
      image
      resources {
        image
        _id
        link
        title
        text
      }
      subtopics {
        _id        
        text
        title
        resources {
          link
          title
          text
          image
          _id
        }

      }
    }
  }
`;

export const QUERY_ALL_SUBTOPICS = gql`
query subtopics {
    subtopics {
        _id
        title
        text
        resources {
          _id
          title
          text
          link
          image
        }
      }
}
`;

export const QUERY_ALL_RESOURCES = gql`
query resources {
    resources {
        _id
        title
        text
        link
        image
      }
}
`;

export const QUERY_ONE_TOPIC = gql`
query topic($_id: ID!) {
    topic(_id: $_id) {
        _id
        title
        url
        text
        image
        link
        subtopics {
          _id
          title
          text
          resources {
            _id
            title
            text
            link
            image
          }
        }
        resources {
          _id
          title
          text
          link
          image
        }
      }
}
`;

export const QUERY_ONE_RESOURCE = gql`
query resource($_id: ID!) {
    resource(_id: $_id) {
        _id: ID
        title: String
        text: String
        image: String
        link: String
    }
}
`;