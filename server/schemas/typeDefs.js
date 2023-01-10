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
        text: String
        imageURL: String
        resources: [Resource]
    }

    type Resource {
        _id: ID
        title: String
        url: String
        text: String
        imageURL: String
        link: String
    }

    type Mutation {
        createAdmin(username: String!, email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        loginAdmin(email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        createTopic(topic: String!, text: String!, imageURL: String!): Admin
        createResource(title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        updateTopic(topic: String!, text: String!, imageURL: String!): Admin
        updateResource(title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        deleteTopic(_id: ID!): Admin
        deleteResource(_id: ID!): Admin
        addResourcetoFavs(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        addResourcetoDo(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        addResourcetoDoing(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        addResourcetoDone(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        deleteResourceFavs(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        deleteResourceDo(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        deleteResourceDoing(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        deleteResourceDone(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): Admin
        addResourcetoFavs(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
        addResourcetoDo(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
        addResourcetoDoing(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
        addResourcetoDone(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
        deleteResourceFavs(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
        deleteResourceDo(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
        deleteResourceDoing(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
        deleteResourceDone(_id: ID!, title: String!, url: String!, text: String!, imageURL: String!, link: String!): User
    }

`;

module.exports = typeDefs;