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
    }

    type Resource {
        _id: ID
        title: String
        text: String
        image: String
        link: String
        doc: String
        docModel: String
    }

    type Subtopic {
        _id: ID
        title: String
        text: String
        doc: String
        docModel: String
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
        topicResources: [Resource]
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
        createSubtopic(title: String!, text: String!, doc: String!, docModel: String!): Subtopic
        createResource(title: String!, text: String!, image: String!, link: String!, doc: String!, docModel: String!): Resource        
        updateResource(_id: ID!, title: String!, text: String!, link: String!, image: String!): Resource    
        deleteResource(_id: ID!): Resource
        deleteSubtopic(_id: ID!): Subtopic
        deleteTopic(_id: ID!): Topic
    }

`;

module.exports = typeDefs;