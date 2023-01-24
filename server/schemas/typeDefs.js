const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Admin {
        _id: ID
        username: String
        email: String
        favorites: [Resource]
        do: [Resource]
        doing: [Resource]
        done: [Resource]
    }

    type User {
        _id: ID
        username: String
        email: String
        favorites: [Resource]
        do: [Resource]
        doing: [Resource]
        done: [Resource]
    }

    type Topic {
        _id: ID
        title: String
        text: String
        link: String
        image: String
        resources: [Resource]
        subtopics: [Subtopic]
    }

    type Resource {
        _id: ID
        title: String
        text: String
        image: String
        link: String
    }

    type Subtopic {
        _id: ID
        title: String
        text: String
        image: String
        link: String
        resources: [Resource]
    }

    type Auth {
        token: ID!
        adminToken: ID!
        user: User
        admin: Admin
      }

    type Query {
        me: User
        users: [User]
        admin: Admin
        admins: [Admin]
        topics: [Topic]
        subtopics: [Subtopic]
        resources: [Resource]
        topic(_id: ID!): Topic
        subtopic(_id: ID!): Subtopic
        resource(_id: ID!): Resource
    }

    type Mutation {
        createAdmin(username: String!, email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        loginAdmin(email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        createTopic(title: String!, text: String!, link: String!, image: String!): Topic
        createSubtopic(title: String!, text: String!, link: String!, image: String!): Subtopic
        createResource(title: String!, text: String!, image: String!, link: String!): Resource        
        updateResource(_id: ID!, title: String!, text: String!, link: String!, image: String!): Resource  
        updateSubtopic(_id: ID!, title: String!, text: String!, link: String!, image: String!): Subtopic   
        addResourceToTopic(_id: ID!, title: String!, text: String!, link: String!, image: String!, topicId: ID!): Topic
        addSubtopicToTopic(title: String!, text: String!, link: String!, image: String!, topicId: ID!): Topic
        addResourceToSubtopic(_id: ID!, title: String!, text: String!, image: String!, link: String!, subtopicId: ID!): Subtopic
        removeResourceFromTopic(_id: ID!, topicId: ID!): Topic
        removeResourceFromSubTopic(_id: ID!, subtopicId: ID!): Subtopic
        removeSubtopicFromTopic(_id: ID!, topicId: ID!): Topic
        deleteResource(_id: ID!): Resource
        deleteSubtopic(_id: ID!): Subtopic
        deleteTopic(_id: ID!): Topic
    }

`;

module.exports = typeDefs;