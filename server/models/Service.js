const { Schema } = require('mongoose');

// service information saved in Business schema
    const serviceSchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
    });

module.exports = serviceSchema;
