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
            };

            if (context.admin) {
                const adminData = await Admin.findOne({ _id: context.user._id })
                    .select("-__v -password");
                return adminData;
            }
            throw new AuthenticationError("Please login or sign up to continue.");
        },
    },

    Mutatation: {

        createAdmin: async (parent, { username, email, password }) => {
            const admin = await Admin.create({ username, email, password });
            const token = signToken(admin);
            return { token, admin };
        },

        createUser: async (parent, { username, email, password }) => {
            const user = await Admin.create({ username, email, password });
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

        createTopic: async (parent, { topic, url, text, image }, context) => {
            if (context.admin) {
                const newTopic = await Topic.create({ topic, url, text, image });
                const updatedAdmin = await Admin.findOneAndUpdate(
                    { _id: context.admin._id },
                    { $addToSet: { topics: newTopic._id } },
                    { new: true }
                ).populate('topics');

                return updatedAdmin;
            }
            throw new AuthenticationError("Please login as an Admin to continue.");
        },

        createResource: async (parent, { title, url, text, image, link }, context) => {
            if (context.admin) {
                const newResource = await Resource.create({ title, url, text, image, link });
                const updatedAdmin = await Admin.findOneAndUpdate(
                    { _id: context.admin._id },
                    { $addToSet: { resources: newResource._id } },
                    { new: true }
                ).populate('resources');

                return updatedAdmin;
            }
            throw new AuthenticationError("Please login as an Admin to continue.");
        },

        addResourceToTopic: async (parent, args, context) => {
            if (context.admin) {

                const updatedAdmin = await Admin.findOneAndUpdate(
                    { _id: context.admin_id },
                    { $addToSet: { topics: { ...args } } },
                    { new: true }
                ).populate({
                    path: 'topics',
                    populate: {
                        path: 'resources',
                    },
                });

                return updatedAdmin;

            }
            throw new AuthenticationError("Please login as an Admin to continue.");
        }

    }
}