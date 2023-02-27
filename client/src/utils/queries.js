import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        favorites {
            _id
            title
            text
            link
        }
        do {
          _id
          title
          text
          link
        }
        doing {
          _id
          title
          text
          link
        }
        done {
          _id
          title
          text
          link
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
    }
}
`;

export const QUERY_ALL_TOPICS = gql`
query topics {
    topics {
      _id
      title
      text
      link
      image
      resources {
        _id
        link
        title
        text
      }
      subtopics {
        _id        
        text
        title
        image
        link
        resources {
          _id
          link
          title
          text
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
        image
        link
        resources {
          _id
          title
          text
          link
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
      }
}
`;

export const QUERY_ALL_QUICKLINKS = gql`
query quicklinks {
  quicklinks {
        _id
        title
        link
      }
}
`;

export const QUERY_ALL_POSTS = gql`
query posts {
    posts {
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
        text
        image
        link
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
            link
          }
        }
        resources {
          _id
          title
          text
          link
        }
      }
}
`;

export const QUERY_ONE_SUBTOPIC = gql`
query subtopic($_id: ID!) {
    subtopic(_id: $_id) {
          _id
          title
          text
          image
          link
          resources {
            _id
            title
            text
            link
          }
        }
}
`;

export const QUERY_ONE_RESOURCE = gql`
query resource($_id: ID!) {
    resource(_id: $_id) {
      _id
      title
      text
      link
    }
}
`;

export const QUERY_SEARCHED_TOPICS = gql`
query searchedTopics($title: String!) {
    searchedTopics(title: $title) {
      _id
      title
      text
      link
      image
      resources {
        _id
        link
        title
        text
      }
      subtopics {
        _id        
        text
        title
        image
        link
        resources {
          _id
          link
          title
          text
        }

      }
    }
  }
`;

export const QUERY_SEARCHED_SUBTOPIC = gql`
query searchedSubtopics($title: String!) {
    searchedSubtopics(title: $title) {
          _id
          title
          text
          image
          link
          resources {
            _id
            title
            text
            link
          }
        }
}
`;

export const QUERY_SEARCHED_RESOURCE = gql`
query searchedResources($title: String!) {
    searchedResources(title: $title) {
      _id
      title
      text
      link
    }
}
`;