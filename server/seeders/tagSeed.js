const db = require('../config/connection');
const { Tag } = require('../models');
const categorySeeds = require('./categorySeeds.json');

db.once('open', async () => {
  try {
    await Tag.deleteMany({});
    await Tag.create(categorySeeds);

    console.log('deleted and created tags');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
