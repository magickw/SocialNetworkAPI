const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res){
        Thought.find()
            .then(async (thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //get a single thought
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json({
                    thought,
            })
            )
            .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
            });
    },
