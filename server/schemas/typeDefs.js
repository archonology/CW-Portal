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
    }

    type Resource {
        _id: ID
        title: String
        url: String
        text: String
        image: String
        link: String
    }

    type Mutation {
        createAdmin(username: String!, email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        loginAdmin(email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        createTopic(topic: String!, url: String! text: String!, image: String!): Admin
        createResource(title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin        
        addResource(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Admin
        updateTopic(topic: String!, text: String!, image: String!): Admin
        updateResource(title: String!, url: String!, text: String!, image: String!, link: String!): Admin        
        deleteTopic(_id: ID!): Admin
        deleteResource(_id: ID!): Admin
        addResource(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): User
        deleteResource(_id: ID!): User
    }

`;

module.exports = typeDefs;