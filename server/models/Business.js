const { Schema, model } = require('mongoose');

// import social media schema for links
const socialMediaSchema = require('./SocialMedia');
// import service schema to save services within business profile
const serviceSchema = require('./Service');

// business information
    const businessSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        // logo goes in the banner at the top of the Vendor's business page
        logo: {
            type: String,
        },
        // can be of the vendor, business, or business activities
        image: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        socialMedia: socialMediaSchema,
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
        services: [serviceSchema],
        clients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Client',
            },
        ],
    });

const Business = model('Business', businessSchema);

module.exports = Business;
