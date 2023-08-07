const { Schema, model } = require('mongoose');

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
            required: true,
        },
    });

const Service = model('Service', serviceSchema);

module.exports = Service;
