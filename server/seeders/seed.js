const db = require('../config/connection');
const { Vendor } = require('../models');
const vendorSeeds = require('./vendorSeeds.json');

db.once('open', async () => {
  try {
    await Vendor.deleteMany({});
    await Vendor.create(vendorSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
