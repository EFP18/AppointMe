const { Schema } = require('mongoose');

// subdocument used in Business Schema
const socialMediaSchema = new Schema({
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    youTube: {
        type: String,
    },
    tikTok: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
});

module.exports = socialMediaSchema;
