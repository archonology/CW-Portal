const { AuthenticationError } = require('apollo-server-express');
const { Admin, User, Topic, Resource } = require('../models');
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

        createTopic: async ({ title, url, text, image }) => {
            if(title) {
                const newTopic = await Topic.create({ title, url, text, image });
                return newTopic;
            }
            throw new AuthenticationError("Something went wrong!");
        },

        // createResource: async (parent, { title, url, text, image, link }, context) => {
        //     if (context.admin) {
        //         const newResource = await Resource.create({ title, url, text, image, link });
        //         const updatedAdmin = await Admin.findOneAndUpdate(
        //             { _id: context.admin._id },
        //             { $addToSet: { resources: newResource._id } },
        //             { new: true }
        //         ).populate('resources');

        //         return updatedAdmin;
        //     }
        //     throw new AuthenticationError("Please login as an Admin to continue.");
        // },

        // addResourceToTopic: async (parent, args, context) => {
        //     if (context.admin) {

        //         const updatedAdmin = await Admin.findOneAndUpdate(
        //             { _id: context.admin_id },
        //             { $addToSet: { topics: { ...args } } },
        //             { new: true }
        //         ).populate({
        //             path: 'topics',
        //             populate: {
        //                 path: 'resources',
        //             },
        //         });

        //         return updatedAdmin;

        //     }
        //     throw new AuthenticationError("Please login as an Admin to continue.");
        // },

    },
};

module.exports = resolvers;