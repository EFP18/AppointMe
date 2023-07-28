const { AuthenticationError } = require('apollo-server-express');
const { Business, Client, Tag, Vendor } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        vendor: async () => {
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
    

    // TODO: add business, del business, upd business, add tag, del tag, +
    // TODO: add service, del service, add client, del client, 
    // TODO: upd socialmedia, del social media,  add vendor, del vendor, upd vendor
    Mutation: {
        addVendor: async (parent, { firstName, lastName, email, password }) => {
            const user = await Vendor.create({ firstName, lastName, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
            throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    },
};

module.exports = resolvers;