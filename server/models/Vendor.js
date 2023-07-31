const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Vendor schema
    const vendorSchema = new Schema(
    {
        firstName: {
          type: String,
        },
        lastName: {
          type: String, 
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
          type: String,
          required: true,
        },
        // business linked by ID
        business: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
        },
    });

// hash user password
vendorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
vendorSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Vendor = model('Vendor', vendorSchema);

module.exports = Vendor;
