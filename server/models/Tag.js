// TODO: languages, music, creative, baking, landscaping, arborism create in db
const { Schema, model } = require('mongoose');

// tag information for businesses to be dsicovered during search
    const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }
    });

const Tag = model('Tag', tagSchema);

module.exports = Tag;
