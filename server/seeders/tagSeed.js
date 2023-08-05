const db = require('../config/connection');
const { Vendor, Tag } = require('../models');
const vendorSeeds = require('./vendorSeeds.json');
const categorySeeds = require('./categorySeeds.json');

db.once('open', async () => {
  try {
    // await Vendor.deleteMany({});
    // await Vendor.create(vendorSeeds);
    await Tag.deleteMany({});
    await Tag.create(categorySeeds);

    console.log('deleted and created tags');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
