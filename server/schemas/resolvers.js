const { AuthenticationError } = require('apollo-server-express');
const { Admin, User, Topic, Subtopic, Resource } = require('../models');
const { signToken, signAdminToken } = require("../utils/auth");

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
            const adminData = await Admin.find({});

            return adminData;
        },

        users: async () => {
            const userData = await User.find({});

            return userData;
        },

        topics: async () => {
            const topicData = await Topic.find({})
                .populate('resources')
                .populate({
                    path: 'subtopics',
                    populate: {
                        path: 'resources'
                    }
                });
            return topicData;
        },

        topic: async (parent, { _id }) => {
            try {
                return Topic.findOne({ _id })
                    .populate('resources')
                    .populate({
                        path: 'subtopics',
                        populate: {
                            path: 'resources'
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        },

        subtopics: async () => {
            const subtopicData = await Subtopic.find({})
                .populate('resources');
            return subtopicData;
        },

        subtopic: async (parent, { _id }) => {
            try {
                return Subtopic.findOne({ _id })
                    .populate('resources');
            } catch (err) {
                console.log(err);
            }
        },

        resources: async () => {
            const resourceData = await Resource.find({});
            return resourceData;
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
            const adminToken = signAdminToken(admin);
            return { adminToken, admin };
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

            const adminToken = signAdminToken(admin);
            return { adminToken, admin };
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

        addResourceToSubtopic: async (parent, { _id, title, text, image, link, subtopicId }) => {
            const updateSubtopic = await Subtopic.findOneAndUpdate(
                { _id: subtopicId },
                { $addToSet: { resources: { _id, title, text, image, link } } },
                { new: true }
            ).populate('resources');
            return updateSubtopic;
        },

        addResourceToTopic: async (parent, { _id, title, text, image, link, topicId }) => {
            const updateTopic = await Topic.findOneAndUpdate(
                { _id: topicId },
                { $addToSet: { resources: { _id, title, text, image, link } } },
                { new: true }
            ).populate('resources');
            return updateTopic;
        },

        addSubtopicToTopic: async (parent, { _id, title, text, image, link, topicId }) => {
            const updateTopic = await Topic.findOneAndUpdate(
                { _id: topicId },
                { $addToSet: { subtopics: { _id, title, text, image, link } } },
                { new: true }
            )
                .populate({
                    path: 'subtopics',
                    populate: {
                        path: 'resources'
                    }
                });
            return updateTopic;
        },

        updateResource: async (parent, { _id, title, text, image, link }) => {
            const updatedResource = await Resource.findOneAndUpdate(
                { _id: _id },
                { $set: { title, text, image, link } },
                { new: true }
            );
            return updatedResource;
        },

        updateSubtopic: async (parent, { _id, title, text, image, link }) => {
            const updatedSubtopic = await Subtopic.findOneAndUpdate(
                { _id: _id },
                { $set: { title, text, image, link } },
                { new: true }
            );
            return updatedSubtopic;
        },

        removeResourceFromTopic: async (parent, { _id, topicId }) => {
            const updatedTopic = await Topic.findOneAndUpdate(
                { _id: topicId },
                { $pull: { resources: _id } },
                { new: true }
            )
                .populate('resources');
            return updatedTopic;
        },

        removeResourceFromSubTopic: async (parent, { _id, subtopicId }) => {
            const updatedSubtopic = await Subtopic.findOneAndUpdate(
                { _id: subtopicId },
                { $pull: { resources: _id } },
                { new: true }
            )
                .populate('resources');
            return updatedSubtopic;
        },

        removeSubtopicFromTopic: async (parent, { _id, topicId }) => {
            const updatedTopic = await Topic.findOneAndUpdate(
                { _id: topicId },
                { $pull: { subtopics: _id } },
                { new: true }
            )
                .populate('subtopics');
            return updatedTopic;
        },


        deleteResource: async (parent, { _id }) => {
            const removeResource = await Resource.deleteOne(
                { _id: _id },
                { new: true }
            );
            return removeResource;
        },

        deleteSubtopic: async (parent, { _id }) => {
            const removeSubtopic = await Subtopic.deleteOne(
                { _id: _id },
                { new: true }
            );
            return removeSubtopic;
        },

        deleteTopic: async (parent, { _id }) => {
            const deleteTopic = await Topic.deleteOne(
                { _id: _id },
                { new: true }
            );
            return deleteTopic;
        },
    }
}

module.exports = resolvers;