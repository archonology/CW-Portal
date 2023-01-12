const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Admin {
        _id: ID
        username: String
        email: String
        topics: [Topic]
        resources: [Resource]
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
        topic: String
        url: String
        text: String
        image: String
        resources: [Resource]
        subtopics: [Subtopic]
    }

    type Resource {
        _id: ID
        title: String
        url: String
        text: String
        image: String
        link: String
    }

    type Subtopic {
        _id: ID
        title: String
        text: String
        resources: [Resource]
    }

    type Auth {
        token: ID!
        user: User
        admin: Admin
      }

    type Query {
        me: User
        admin: Admin
        topic(_id: ID!): Topic
        resource(_id: ID!): Resource
    }

    type Mutation {
        createAdmin(username: String!, email: String!, password: String!): Admin
        createUser(username: String!, email: String!, password: String!): User
        loginAdmin(email: String!, password: String!): Admin
        loginUser(email: String!, password: String!): User
        createTopic(topic: String!, url: String! text: String!, image: String!): Admin
        createResource(title: String!, url: String!, text: String!, image: String!, link: String!): Admin            
        addResourceToTopic(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Admin
        adminUpdateTopic(_id: ID!, topic: String!, text: String!, image: String!): Admin
        adminUpdateResource(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Admin        
        adminDeleteTopic(_id: ID!): Admin
        adminDeleteResource(_id: ID!): Admin
        userAddResource(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): User
        userDeleteResource(_id: ID!): User
    }

`;

module.exports = typeDefs;