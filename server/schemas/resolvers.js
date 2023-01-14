const { AuthenticationError } = require('apollo-server-express');
const { Admin, User, Topic, Subtopic, Resource } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password");
                return userData;
            }
            throw new AuthenticationError("Please login or sign up to continue.");
        },

        admin: async (parent, args, context) => {
            if (context.admin) {
                const adminData = await Admin.findOne({ _id: context.user._id })
                    .select("-__v -password");
                return adminData;
            }
            throw new AuthenticationError("Please login as admin to continue.");
        },

        admins: async () => {
            return await Admin.find({});
        },

        users: async () => {
            return await User.find({});
        },

        topics: async () => {
            return await Topic.find({});
        },

        topic: async (parent, { _id }) => {
            try {
                return Topic.findOne({ _id })
            } catch (err) {
                console.log(err);
            }
        },

        subtopics: async () => {
            return await Subtopic.find({});
        },

        subtopic: async (parent, { _id }) => {
            try {
                return Subtopic.findOne({ _id })
            } catch (err) {
                console.log(err);
            }
        },

        resources: async () => {
            return await Resource.find({});
        },

        resource: async (parent, { _id }) => {
            try {
                return Resource.findOne({ _id })
            } catch (err) {
                console.log(err);
            }
        },
    },

    Mutation: {

        createAdmin: async (parent, { username, email, password }) => {
            const admin = await Admin.create({ username, email, password });
            const token = signToken(admin);
            return { token, admin };
        },

        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        loginAdmin: async (parent, { email, password }) => {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                throw new AuthenticationError('No admin found by that email address.');
            }

            const correctPassword = await admin.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Password is incorrect.');
            }

            const token = signToken(admin);
            return { token, admin };
        },

        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found by that email address.');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Password is incorrect.');
            }

            const token = signToken(user);
            return { token, user };
        },

        createTopic: async (parent, args) => {
            const newTopic = await Topic.create({ ...args });
            return newTopic;
        },

        createSubtopic: async (parent, args) => {
            const newSubtopic = await Subtopic.create({ ...args });
            return newSubtopic;
        },

        createResource: async (parent, args) => {
            const newResource = await Resource.create({ ...args });
            return newResource;
        },

        addResourceToTopic: async (parent, { resourceData, topicId }) => {
            const updateTopic = await Topic.findOneAndUpdate(
                { _id: topicId },
                { $addToSet: { resources: { ...resourceData } } },
                { new: true }
            );
            return updateTopic;
        },

        addSubtopicToTopic: async (parent, args) => {
            const updateTopic = await Topic.findOneAndUpdate(
                { _id: args.topicId },
                { $addToSet: { subtopics: { ...args } } },
                { new: true }
            );
            return updateTopic;
        },

        addResourceToSubtopic: async (parent, { resourceData, subtopicId }) => {
            const updateTopic = await Subtopic.findOneAndUpdate(
                { _id: subtopicId },
                { $addToSet: { resources: { ...resourceData } } },
                { new: true }
            );
            return updateTopic;
        },
    }
}

module.exports = resolvers;