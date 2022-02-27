const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res){
        Thought.find()
        // populate all of the reactions associated with it
        // .populate({path: 'reactions', select: '-__v'})
        // .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //get a single thought
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
        // .populate({path: 'reactions', select: '-__v'})
        // .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(thought)
            )
            .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
            });
    },
    //create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                  { _id: req.body.userId },
                  { $addToSet: { thoughts: thought._id } },//insert unless already exists
                  { new: true }
                );
              })
              .then((user) =>
                !user
                  ? res.status(404).json({
                      message: 'Thought created, but found no user with that id',
                    })
                  : res.json('Created a thought 🎉')
              )
              .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
          },

    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
          )
            .then((thought) =>
              !thought
                ? res.status(404).json({ message: 'No thought with that id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //delete thought
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId }, 
          {new: true},)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : Thought.deleteMany({ _id: { $in: thought.reactions } })
        )
        .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    //creation reaction
    createReaction(req, res){
        console.log('You are adding a reaction.');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .populate({path: 'reactions', select: ('-__v')})
        .then((thought) =>
                !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that id.' })
                : res.json(thought)
        )
            .catch((err) => res.status(500).json(err));
    },
    //delete reaction
    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
          )
          .populate({path: 'reactions', select: '-__v'})
          .then( (thought) =>
              !thought
                ? res.status(404).json({ message: 'No thought found with that id.' })
                : Thought.deleteMany({ _id: { $in: thought.reactions } })
                )
                            .then(() => res.json({ message: 'Reaction deleted!' }))
                            .catch((err) => res.status(500).json(err));
            },
};