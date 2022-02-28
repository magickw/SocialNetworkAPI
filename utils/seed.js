const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomUserName, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

// Creates a connection to mongodb
connection.once('open', async () => {
  console.log('connected');
  
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});
  // Empty arrays for randomly generated users
  const users = [];

  for (let i = 0; i < 5; i++) {
    const username = getRandomUserName();
    const newUser = {
      username: username,
      email: `${username}@email.com`,
    };
    users.push(newUser);
  }

  // Wait for the users to be inserted into the database
  await User.collection.insertMany(users);

  const thoughts = [];
  for (let i = 0; i < 5; i++) {
    const thoughtText = getRandomThought();
    const newThought = {
      thoughtText: thoughtText,
    };
    thoughts.push(newThought);
  }
  await Thought.collection.insertMany(thoughts);


  // const reactions =[];
  // for (let i = 0; i < 10; i++) {
  //   const reactionBody = getRandomReaction();
  //   const newReaction = {
  //     reactionBody: reactionBody,
  //   };
  //   reactions.push(newReaction);
  // }
  // await Reaction.collection.insertMany(reactions);

  console.table(users);
  console.table(thoughts);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});