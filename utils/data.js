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
    '',
]

const reactions = [
    '',

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