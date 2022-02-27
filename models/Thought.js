const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

//Creates reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: [
        {
            type: Date,
            default: Date.now(),
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false, //don't return the id of the emlement(s)
  }
);
// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;