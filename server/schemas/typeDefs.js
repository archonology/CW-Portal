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

    type Auth {
        token: ID!
        user: User
        admin: Admin
      }

    type Query {
        me: User
        users: [User]
        admin: Admin
        admins: [Admin]
        topics: [Topic]
        resources: [Resource]
        topic(_id: ID!): Topic
        resource(_id: ID!): Resource
    }

    type Mutation {
        createAdmin(username: String!, email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        loginAdmin(email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        createTopic(title: String!, url: String! text: String!, image: String!): Topic
        createSubtopic(title: String!, url: String! text: String!): Topic
        createResource(title: String!, url: String!, text: String!, image: String!, link: String!): Resource            
        addResourceToTopic(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Topic
        updateTopic(_id: ID!, title: String!, text: String!, image: String!): Topic
        updateResource(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Resource        
        deleteTopic(_id: ID!): Topic
        deleteResource(_id: ID!): Resource
        userAddToList(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): User
        adminAddToList(_id: ID!, title: String!, url: String!, text: String!, image: String!, link: String!): Admin
        userRemoveFromList(_id: ID!): User
        adminRemoveFromList(_id: ID!): Admin
    }

`;

module.exports = typeDefs;