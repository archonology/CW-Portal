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
            url: String
            text: String
            image: String
            link: String
        }
        do {
            _id: ID
            title: String
            url: String
            text: String
            image: String
            link: String
        }
        doing {
            _id: ID
            title: String
            url: String
            text: String
            image: String
            link: String
        }
        done {
            _id: ID
            title: String
            url: String
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
            url: String
            text: String
            image: String
            link: String
        }
        do {
            _id: ID
            title: String
            url: String
            text: String
            image: String
            link: String
        }
        doing {
            _id: ID
            title: String
            url: String
            text: String
            image: String
            link: String
        }
        done {
            _id: ID
            title: String
            url: String
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
        topic
        url
        text
        image
        resources {
            _id: ID
            title: String
            url: String
            text: String
            image: String
            link: String
        }
        subtopics {
            _id
            title
            url
            resources {
                _id: ID
                title: String
                url: String
                text: String
                image: String
                link: String
            }
        }
    }
}
`;

export const QUERY_ALL_RESOURCES = gql`
query resources {
    resources {
        _id: ID
        title: String
        url: String
        text: String
        image: String
        link: String
    }
}
`;

export const QUERY_ONE_TOPIC = gql`
query topic($_id: ID!) {
    topic(_id: $_id) {
        _id
        topic
        url
        text
        image
        resources {
            _id: ID
            title: String
            url: String
            text: String
            image: String
            link: String
        }
        subtopics {
            _id
            title
            url
            resources {
                _id: ID
                title: String
                url: String
                text: String
                image: String
                link: String
            }
        }
    }
}
`;

export const QUERY_ONE_RESOURCE = gql`
query resource($_id: ID!) {
    resource(_id: $_id) {
        _id: ID
        title: String
        url: String
        text: String
        image: String
        link: String
    }
}
`;