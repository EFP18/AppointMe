const { AuthenticationError } = require('apollo-server-express');
const { Business, Client, Tag, Vendor, Service } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const { __DirectiveLocation } = require('graphql');

const resolvers = {
    Query: {
        vendor: async (parent, argsObj, context) => {
            if (!context.vendor) {
                throw new AuthenticationError('not logged in');
            };
            // need to define id parameter to indicate which vendor this queries
            return Vendor.findById(context.vendor._id)
                .populate({
                    path: 'business',
                    populate: [
                        {
                            path: 'tags'
                        },
                        {
                            path: 'socialMedia'
                        },
                        {
                            path: 'services'
                        },
                        {
                            path: 'clients'
                        }
                    ]
                });
        },
        business: async (parent, argsObj, context) => {
            if (context.vendor) {
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                return Business.findOne({ _id: currVendor.business._id })
                .populate('tags')
                .populate('socialMedia')
                .populate('services')
                .populate('clients')
            }
        },
        businesses: async () => {
            return Business.find()
                .populate('tags')
                .populate('services')
                .populate('clients');
        },
        businessCV: async (parent, { _id }) => {
            return Business.findOne({ _id: _id })
                .populate('tags')
                .populate('socialMedia')
                .populate('services')
        },
        client: async (parent, { _id }, context) => {
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
        addVendor: async (parent, { email, password }) => {
            const vendor = await Vendor.create({ email, password });
            const token = signToken(vendor);
            return { token, vendor };
        },
        delVendor: async (parent, { _id }) => {
            const delVendor = await Vendor.findOneAndDelete({ _id });
            return delVendor;
        },
        updVendor: async (parent, argsObj, context) => {
            if (context.vendor) {
                const updatedVendor = await Vendor.findOneAndUpdate(
                    { _id: context.vendor._id },
                    { $set: argsObj },
                    { new: true },
                );
                return updatedVendor;
            }
        },
        addBusiness: async (parent, argsObj, context) => {
            const newBusiness = await Business.create(argsObj)
            if (context.vendor) {
                const updatedVendor = await Vendor.findOneAndUpdate(
                    { _id: context.vendor._id },
                    { $set: { business: newBusiness._id } },
                    { new: true },
                );
                return newBusiness;
            }
        },
        updBusiness: async (parent, argsObj, context) => {
            if (context.vendor) {
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $set: argsObj },
                    { new: true },
                );
                return updatedBusiness;
            }
        },
        delBusiness: async (parent, { }, context) => {
            if (context.vendor) {
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                const updatedBusiness = await Business.findOneAndDelete(
                    { _id: currVendor.business._id }
                );
                const updatedVendor = await Vendor.findOneAndUpdate(
                    { _id: currVendor._id },
                    { $set: { business: null } },
                    { new: true },
                );
                return updatedVendor;
            }
        },
        createTag: async (parent, { name }) => {
            const newTag = await Tag.create({ name });
            return newTag;
        },
        addTag: async (parent,   { _id } , context) => {
            if (context.vendor) {
                const tagId = new mongoose.Types.ObjectId(_id)
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $set: { tags: tagId } },
                    { new: true },
                );
                return updatedBusiness;
            }
        },
        // convert _id to Object id type
        rmvTag: async (parent, { _id }, context) => {
            if (context.vendor) {
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                // convert string id to objectid
                const tagId = new mongoose.Types.ObjectId(_id)
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $set: { tags: null } },
                    { new: true },
                );
                return updatedBusiness;
            }
        },
        addService: async (parent, { name, description, price }, context) => {
            const newService = await Service.create({ name, description, price })
            if (context.vendor) {
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $addToSet: { services: newService._id } },
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
        DelService: async (parent, { _id }, context) => {
            if (context.vendor) {
                const serviceId = new mongoose.Types.ObjectId(_id)
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $pull: { services: serviceId } },
                    { new: true },
                );
                const delService = await Service.findOneAndDelete(
                    { _id: serviceId }
                )
                return delService;
            }
        },
        manageServices: async (parent, { servicesArr }, context) => {

            const message = "Services updated"

            const toBeEditedArr = servicesArr
                // servicesArr, filtered by type of edited and then create a new array that only includes the data and not the type
                .filter(({ type }) => type === 'edited')
                .map(({ data }) => data);
            
            const toBeCreatedArr = servicesArr 
            // creates a new service, filters by type of new
            // creates new array with map with only the data
            // delete removed the _id from the newData created in the new array 
                .filter(({ type }) => type === 'new')
                .map(({ data }) => {
                    const newData = { ...data };
                    delete newData._id;
                    return newData;
                });

            const newService = async (data) => {
                const addedService = await Service.create({ name: data.name, description: data.description, price: data.price })
                if (context.vendor) {
                    const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                    const updatedBusiness = await Business.findOneAndUpdate(
                        { _id: currVendor.business._id },
                        // push new services id to the business
                        { $addToSet: { services: addedService._id } },
                        { new: true },
                    );
                }
            }
            
            if (toBeCreatedArr.length > 0){
                toBeCreatedArr.forEach(newService)
            }

            // const DelService = async (data) => {
            //     const deletedService = await Service.deleteOne({ name: data.name, description: data.description, price: data.price })
            //     if (context.vendor) {
            //         const currVendor = await Vendor.findOne({ _id: context.vendor._id });
            //         const updatedBusiness = await Business.findOneAndUpdate(
            //             { _id: currVendor.business._id },
            //             // push new services id to the business
            //             { $addToSet: { services: deletedService._id } },
            //             { new: true },
            //         );
            //     }
            // }
            
            // if (toBeEditedArr.length > 0){
            //     toBeEditedArr.forEach(DelService)
            // }
            console.log(toBeEditedArr)

            const updService = async (data) => {
                await Service.findOneAndUpdate(
                    { _id: data._id },
                    { $set: { name: data.name, description: data.description, price: data.price } },
                    { new: true },
                );
            }

            if (toBeEditedArr.length > 0){
                toBeEditedArr.forEach(updService)
            }

            return message;
        },
        addClient: async (parent, argsObj, context) => {
            const newClient = await Client.create(argsObj)
            if (context.vendor) {
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $addToSet: { clients: newClient._id } },
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
            if (context.vendor) {
                const clientId = new mongoose.Types.ObjectId(_id)
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $pull: { clients: clientId } },
                    { new: true },
                );
                const deletedClient = await Client.findOneAndDelete(
                    { _id: clientId }
                )
                return deletedClient;
            }
        },
        updSocialMedia: async (parent, argsObj, context) => {
            if (context.vendor) {
                const currVendor = await Vendor.findOne({ _id: context.vendor._id });

                const updateObject = {
                    'socialMedia.facebook': argsObj.facebook || '',
                    'socialMedia.instagram': argsObj.instagram || '',
                    'socialMedia.youTube': argsObj.youTube || '',
                    'socialMedia.tikTok': argsObj.tikTok || '',
                    'socialMedia.linkedIn': argsObj.linkedIn || '',
                }
                const updatedBusiness = await Business.findOneAndUpdate(
                    { _id: currVendor.business._id },
                    { $set: updateObject },
                    { new: true }
                );

                return updatedBusiness;
            }
        },
        login: async (parent, { email, password }) => {
            const vendor = await Vendor.findOne({ email });
            if (!vendor) {
                throw new AuthenticationError('No vendor found with this email address');
            }
            const correctPw = await vendor.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(vendor);
            return { token, vendor };
        },
    },
};

module.exports = resolvers;