const { AuthenticationError } = require('apollo-server-express');
const { Business, Client, Tag, Vendor, Service } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        vendor: async () => {
            // need to define id parameter to indicate which vendor this queries
            return Vendor.findOne({ _id });
        },
        business: async () => {
            return Business.findOne({ _id })
            .populate('tags')
            .populate('services')
            .populate('clients');
        },
        businesses: async () => {
            return Business.find()
                .populate('tags')
                .populate('services')
                .populate('clients');
        },
        client: async () => {
            return Client.findOne({ _id }).populate('previousShopping');
        },
        clients: async () => {
            return Client.find().populate('previousShopping');
        },
        tags: async () => {
            return Tag.find();
        },
    },

    Mutation: {
        addVendor: async (parent, { firstName, lastName, email, password }) => {
            const user = await Vendor.create({ firstName, lastName, email, password });
            const token = signToken(user);
            return { token, user };
        },
        delVendor: async (parent, { _id }) => {
            const delVendor = await Vendor.findOneAndDelete({_id});
            return delVendor;
        },
        updVendor: async (parent, { firstName, lastName, email }, context) => {
            if (context.user){
                const updatedVendor = await Vendor.findOneAndUpdate(
                    { _id: context.user._id },
                    { $set: { firstName, lastName, email } },
                    { new: true },
                );
                return updatedVendor;
            }
        },
        addBusiness: async (parent, { name, description, logo, image, address, phone, email }, context) => {
            const newBusiness = await Business.create({ name, description, logo, image, address, phone, email })
            if (context.user){
                const updatedVendor = await Vendor.findOneAndUpdate(
                    { _id: context.user._id},
                    { $set: { business: newBusiness._id }},
                    { new: true },
                );
            return newBusiness;
            }
        },
        updBusiness: async (parent, { name, description, logo, image, address, phone, email  }, context) => {
            if (context.user){
                const currUser = await Vendor.findOne( { _id: context.user._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currUser.business._id },
                    { $set: { name, description, logo, image, address, phone, email  } },
                    { new: true },
                );
                return updatedBusiness;
            }
        },
        delBusiness: async (parent, {  }, context) => {
            if (context.user){
                const currUser = await Vendor.findOne( { _id: context.user._id });
                const updatedBusiness = await Business.findOneAndDelete(
                    { _id: currUser.business._id }
                );
                const updatedUser = await Vendor.findOneAndUpdate(
                    { _id: currUser._id },
                    { $set: { business: null } },
                    { new: true },
                );
                return updatedUser;
            }
        },
        createTag: async (parent, { name }) => {
            const newTag = await Tag.create({ name });
            return newTag;
        },
        addTag: async (parent, { _id }, context) => {
            if (context.user){
                const currUser = await Vendor.findOne( { _id: context.user._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currUser.business._id },
                    { $addToSet: { tags: _id }},
                    { new: true },
                );
                return updatedBusiness;
            };
        },
        // convert _id to Object id type
        rmvTag: async (parent, { _id }, context) => {
            if (context.user){
                const currUser = await Vendor.findOne({ _id: context.user._id });
                const tagId = new mongoose.Types.ObjectId(_id)
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currUser.business._id },
                    { $pull: { tags:  tagId }},
                    { new: true },
                );
                return updatedBusiness;
            }
        },
        addService: async (parent, { name, description, price }, context) => {
            const newService = await Service.create({ name, description, price })
            if (context.user){
                const currUser = await Vendor.findOne( { _id: context.user._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currUser.business._id },
                    { $addToSet: { services: newService._id }},
                    { new: true },
                );
                return updatedBusiness;
            }
        },
        updService: async (parent, { _id, name, description, price }) => {
            const updService = await Service.findOneAndUpdate(
                { _id: _id },
                { $set: { name, description, price } },
                { new: true },
            );
            return updService;
        },
        delService: async (parent, { _id }, context) => {
            if (context.user){
                const serviceId = new mongoose.Types.ObjectId(_id)
                const currUser = await Vendor.findOne({ _id: context.user._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currUser.business._id },
                    { $pull: { services: serviceId }},
                    { new: true },
                );
                const delService = await Service.findOneAndDelete(
                    {_id: serviceId}
                )
                return delService;
            }
        },
        addClient: async (parent, { firstName, lastName, email, address, phone, note }, context) => {
            const newClient = await Client.create({ firstName, lastName, email, address, phone, note })
            if (context.user){
                    const currUser = await Vendor.findOne( { _id: context.user._id });
                    const updatedBusiness = await Business.findOneAndUpdate(
                        { _id: currUser.business._id },
                        { $addToSet: { clients: newClient._id }},
                        { new: true },
                    );
                    return newClient;
            }
        },
        updClient: async (parent, { _id, firstName, lastName, email, address, phone, note }) => {
            const updClient = await Client.findOneAndUpdate(
                { _id: _id },
                { $set: { firstName, lastName, email, address, phone, note } },
                { new: true },
            );
            return updClient;
        },
        delClient: async (parent, { _id }, context) => {
            if (context.user){
                const clientId = new mongoose.Types.ObjectId(_id)
                const currUser = await Vendor.findOne({ _id: context.user._id});
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currUser.business._id },
                    { $pull: { clients: clientId }},
                    { new: true },
                );
                const delClient = await Client.findOneAndDelete(
                    {_id: clientId}
                )
                return delClient;
            }
        },
        updSocialMedia: async (parent, { facebook, instagram, youTube, tikTok, linkedIn }, context) => {
            if (context.user){
                const currUser = await Vendor.findOne( { _id: context.user._id });

                const updateObject = {
                    'socialMedia.facebook': facebook,
                    'socialMedia.instagram': instagram,
                    'socialMedia.youTube': youTube,
                    'socialMedia.tikTok': tikTok,
                    'socialMedia.linkedIn': linkedIn
                }

                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currUser.business._id },
                    { $set: updateObject},
                    { new: true}
                );

                return updatedBusiness;
            }
        },
        login: async (parent, { email, password }) => {
            const user = await Vendor.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
    },
};

module.exports = resolvers;