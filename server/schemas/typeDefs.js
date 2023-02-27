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

    type QuickLink {
        _id: ID
        title: String
        link: String
    }

    type Post {
        _id: ID
        title: String
        text: String
        link: String
        image: String
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
        searchedTopics(title: String!): [Topic]
        subtopics: [Subtopic]
        resources: [Resource]
        quicklinks: [QuickLink]
        posts: [Post]
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
        createResource(title: String!, text: String!, link: String!): Resource 
        createQuickLink(title: String!, link: String!): QuickLink
        createPost(title: String!, text: String!, link: String!, image: String!): Post
        addResourceToFavs(_id: ID!, title: String!, text: String!, link: String!): User
        addResourceToDo(_id: ID!, title: String!, text: String!, link: String!): User
        addResourceToDone(_id: ID!, title: String!, text: String!, link: String!): User
        addResourceToDoing(_id: ID!, title: String!, text: String!, link: String!): User
        updateResource(_id: ID!, title: String!, text: String!, link: String!): Resource  
        updateSubtopic(_id: ID!, title: String!, text: String!, link: String!, image: String!): Subtopic
        updateTopic(_id: ID!, title: String!, text: String!, link: String!, image: String!): Topic 
        updateQuickLink(_id: ID!, title: String!, link: String!): QuickLink
        updatePost(_id: ID!, title: String!, text: String!, link: String!, image: String!): Post    
        addResourceToTopic(_id: ID!, title: String!, text: String!, link: String!, topicId: ID!): Topic
        addSubtopicToTopic(_id: ID!, title: String!, text: String!, image: String!, link: String!, topicId: ID!): Topic
        addResourceToSubtopic(_id: ID!, title: String!, text: String!, link: String!, subtopicId: ID!): Subtopic
        removeResourceFromFavs(_id: ID!): User
        removeResourceFromDo(_id: ID!): User
        removeResourceFromDoing(_id: ID!): User
        removeResourceFromDone(_id: ID!): User
        removeResourceFromTopic(_id: ID!, topicId: ID!): Topic
        removeResourceFromSubTopic(_id: ID!, subtopicId: ID!): Subtopic
        removeSubtopicFromTopic(_id: ID!, topicId: ID!): Topic
        deleteResource(_id: ID!): Resource
        deleteSubtopic(_id: ID!): Subtopic
        deleteTopic(_id: ID!): Topic
        deleteQuickLink(_id: ID!): QuickLink
        deletePost(_id: ID!): Post
    }

`;

module.exports = typeDefs;