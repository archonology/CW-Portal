const { AuthenticationError } = require('apollo-server-express');
const { Admin, User, Topic, Subtopic, Resource, QuickLink, Post } = require('../models');

const { signToken, signAdminToken } = require("../utils/auth");

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate('favorites')
                    .populate('do')
                    .populate('doing')
                    .populate('done')
                    .populate('userQuickLinks');
                return userData;
            }
            throw new AuthenticationError("Please log in to continue");
        },

        admin: async (parent, args, context) => {
            if (context.admin) {
                const adminData = await Admin.findOne({ _id: context.admin._id })
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
            const userData = await User.find({})
                .populate('favorites')
                .populate('do')
                .populate('doing')
                .populate('done')
                .populate('userQuickLinks');

            return userData;
        },

        topics: async () => {
            const topicData = await Topic.find({}).sort({ title: 1 })
                .populate('resources')
                .populate({
                    path: 'subtopics',
                    populate: {
                        path: 'resources'
                    }
                });
            return topicData;
        },

        // the RegExp in the search queries below handles case sensitive default of Mongoose
        searchedTopics: async (parent, { title }) => {

            const topicData = await Topic.find({ title: { $regex: new RegExp(title, "i") } }).sort({ title: 1 })
                .populate('resources')
                .populate({
                    path: 'subtopics',
                    populate: {
                        path: 'resources'
                    }
                });
            return topicData;
        },

        searchedSubtopics: async (parent, { title }) => {

            const subtopicData = await Subtopic.find({ title: { $regex: new RegExp(title, "i") } }).sort({ title: 1 })
                .populate('resources');
            return subtopicData;
        },

        searchedResources: async (parent, { title }) => {

            const resourceData = await Resource.find({ title: { $regex: new RegExp(title, "i") } }).sort({ title: 1 });
            return resourceData;
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
            return resourceData.reverse();
        },

        resource: async (parent, { _id }) => {
            try {
                return Resource.findOne({ _id })
            } catch (err) {
                console.log(err);
            }
        },

        quicklinks: async () => {
            const quickLinkData = await QuickLink.find({});
            return quickLinkData;
        },

        posts: async () => {
            const postData = await Post.find({});
            return postData;
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

        createQuickLink: async (parent, args) => {
            const newQuickLink = await QuickLink.create({ ...args });
            return newQuickLink;
        },

        createUserQuickLink: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { userQuickLinks: { ...args } } },
                    { new: true }
                ).populate('userQuickLinks');
                return updatedUser;
            }
            throw new AuthenticationError("Please log in to add to a list.");
        },

        createPost: async (parent, args) => {
            const newPost = await Post.create({ ...args });
            return newPost;
        },

        addResourceToFavs: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { favorites: { ...args } } },
                    { new: true }
                ).populate('favorites');
                return updatedUser;
            }
            throw new AuthenticationError("Please log in to add to a list.");
        },

        addResourceToDo: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { do: { ...args } } },
                    { new: true }
                ).populate('do');
                return updatedUser;
            }
            throw new AuthenticationError("Please log in to add to a list.");
        },

        addResourceToDoing: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { doing: { ...args } } },
                    { new: true }
                ).populate('doing');
                return updatedUser;
            }
            throw new AuthenticationError("Please log in to add to a list.");
        },

        addResourceToDone: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { done: { ...args } } },
                    { new: true }
                ).populate('done');
                return updatedUser;
            }
            throw new AuthenticationError("Please log in to add to a list.");
        },

        removeResourceFromFavs: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { favorites: _id } },
                    { new: true }
                ).populate('favorites');
                return updatedUser;
            }
        },

        removeResourceFromDo: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { do: _id } },
                    { new: true }
                ).populate('do');
                return updatedUser;
            }
        },

        removeResourceFromDoing: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { doing: _id } },
                    { new: true }
                ).populate('doing');
                return updatedUser;
            }
        },

        removeResourceFromDone: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { done: _id } },
                    { new: true }
                ).populate('done');
                return updatedUser;
            }
        },

        deleteUserQuickLink: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { userQuickLinks: { _id } } },
                    { new: true }
                ).populate('userQuickLinks');
                return updatedUser;
            }
        },

        addResourceToSubtopic: async (parent, { _id, title, text, link, subtopicId }) => {
            const updateSubtopic = await Subtopic.findOneAndUpdate(
                { _id: subtopicId },
                { $addToSet: { resources: { _id, title, text, link } } },
                { new: true }
            ).populate('resources');
            return updateSubtopic;
        },

        addResourceToTopic: async (parent, { _id, title, text, link, topicId }) => {
            const updateTopic = await Topic.findOneAndUpdate(
                { _id: topicId },
                { $addToSet: { resources: { _id, title, text, link } } },
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

        updateResource: async (parent, { _id, title, text, link }) => {
            const updatedResource = await Resource.findOneAndUpdate(
                { _id: _id },
                { $set: { title, text, link } },
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

        updateTopic: async (parent, { _id, title, text, image, link }) => {
            const updatedTopic = await Topic.findOneAndUpdate(
                { _id: _id },
                { $set: { title, text, image, link } },
                { new: true }
            );
            return updatedTopic;
        },

        updateQuickLink: async (parent, { _id, title, link }) => {
            const updatedQuickLink = await QuickLink.findOneAndUpdate(
                { _id: _id },
                { $set: { title, link } },
                { new: true }
            );
            return updatedQuickLink;
        },

        updatePost: async (parent, { _id, title, text, image, link }) => {
            const updatedPost = await Post.findOneAndUpdate(
                { _id: _id },
                { $set: { title, text, image, link } },
                { new: true }
            );
            return updatedPost;
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

        deleteQuickLink: async (parent, { _id }) => {
            const removeQuickLink = await QuickLink.deleteOne(
                { _id: _id },
                { new: true }
            );
            return removeQuickLink;
        },

        deletePost: async (parent, { _id }) => {
            const deletePost = await Post.deleteOne(
                { _id: _id },
                { new: true }
            );
            return deletePost;
        },
    }
}

module.exports = resolvers;