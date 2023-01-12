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
        url: String
        text: String
        resources: [Resource]
    }

    type UserAuth {
        token: ID!
        user: User
      }

      type AdminAuth {
        token: ID!
        admin: Admin
      }

    type Query {
        me: User
        admin: Admin
        topics: [Topic]
        resources: [Resource]
        topic(_id: ID!): Topic
        resource(_id: ID!): Resource
    }

    type Mutation {
        createAdmin(username: String!, email: String!, password: String!): AdminAuth
        createUser(username: String!, email: String!, password: String!): UserAuth
        loginAdmin(email: String!, password: String!): AdminAuth
        loginUser(email: String!, password: String!): UserAuth
        createTopic(topic: String!, url: String! text: String!, image: String!): Topic
        createSubtopic(title: String!, url: String! text: String!): Topic
        createResource(title: String!, url: String!, text: String!, image: String!, link: String!): Resource            
        addResourceToTopic(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Topic
        adminUpdateTopic(_id: ID!, topic: String!, text: String!, image: String!): Topic
        adminUpdateResource(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Resource        
        adminDeleteTopic(_id: ID!): Topic
        adminDeleteResource(_id: ID!): Admin
        userAddResource(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): User
        userDeleteResource(_id: ID!): User
    }

`;

module.exports = typeDefs;