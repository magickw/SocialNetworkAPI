const { Schema, model } = require('mongoose');
const Thought = require('./Thought');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //regular expression to check if it's a valid email address
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    },
    friends: [{ 
      type: Schema.Types.ObjectId,
      ref: 'User'}],
  },
  {
    toJSON: {
        virtuals: true,
    },
    id:false,
  },
);

// Create a virtual property `friendCount` that gets the amount of reactions per user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

  const User = model('User', userSchema);

module.exports = User;