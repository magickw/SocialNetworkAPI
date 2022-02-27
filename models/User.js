const { Schema, model } = require('mongoose');

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
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
  }],
    friends: [{ 
      type: Schema.Types.ObjectId,
      ref: 'user'}],
  },
  {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id:false,
  },
);

// Create a virtual property `friendCount` that gets the amount of reactions per user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;