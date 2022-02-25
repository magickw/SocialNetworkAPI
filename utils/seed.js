const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomUserName } = require('./data');

connection.on('error', (err) => err);

// Creates a connection to mongodb
connection.once('open', async () => {
  console.log('connected');
  
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});
  // Empty arrays for randomly generated users
  const users = [];

  for (let i = 0; i < 10; i++) {
    const name = getRandomUserName();
    const thought = getRandomThought();
    const newUser = {
      username: name,
      email: `${name}@email.com`,
      thoughts: thought,
    };
    users.push(newUser);
  }

  // Wait for the users to be inserted into the database
  await User.collection.insertMany(users);

  console.table(users);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});