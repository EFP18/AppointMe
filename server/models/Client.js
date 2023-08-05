const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

// client's info; this is designed for future dev to allow clients to log in, book appointments, and pay
    const clientSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String, 
        },
        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
        },
        note: {
            type: String,
        },
        previousShopping: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Business',
            },
        ], 
    });

// // hash user password
// clientSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     }
//     next();
// });

// // custom method to compare and validate password for logging in
// clientSchema.methods.isCorrectPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

const Client = model('Client', clientSchema);

module.exports = Client;
