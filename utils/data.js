const usernames = [
    'Aaran',
  'Smith',
  'Jones',
  'Zendel',
  'Zenith',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',,
  'Xander',
  'Jared',
  'Grace',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
]

const thoughts = [
    'Looking at the current situation in Ukraine, North Korea and Iran will never give up their nuclear weapons',
    'As you can see from Russia invasion of Ukraine, the world is now witnessing the reality that countries with nuclear weapons are strong in the end.',
]

const reactions = [
    'Fake news',
    'I disagree',
    'I understand',
    'LMAO',
    'lol',

]

 

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets random thought
const getRandomThought = () =>
  `${getRandomArrItem(thoughts)}`;

const getRandomUserName = () =>
  `${getRandomArrItem(usernames)}${Math.floor(Math.random() * 10 + 1)}`;

// Export the functions for use in seed.js
module.exports = { getRandomThought, getRandomUserName };