const usernames = [
  'Smith',
  'Jones',
  'Grace',
  'Alex',
  'Mark',
]

const thoughtText = [
    'Looking at the current situation in Ukraine, North Korea and Iran will never give up their nuclear weapons',
    'As you can see from Russia invasion of Ukraine, the world is now witnessing the reality that countries with nuclear weapons prevail in the end.',
    'I like apples.',
    'I will have a job interview tomorrow.',
    'Putin invaded Ukraine',
]

const reactionBody = [
    'Fake news',
    'I disagree',
    'I understand',
    'Stand with Ukraine people!',
    'Good luck!',

]

 

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets random thought
const getRandomThought = () =>
  `${getRandomArrItem(thoughtText)}`;

// Gets random username
const getRandomUserName = () =>
  `${getRandomArrItem(usernames)}${Math.floor(Math.random() * 10 + 1)}`;

//Gets random reaction

const getRandomReaction = () =>
  `${getRandomArrItem(reactionBody)}`;
// Export the functions for use in seed.js
module.exports = { getRandomThought, getRandomUserName, getRandomReaction };