const { User, Thought } = require('../models');

module.exports = {
    //get all users
    getUsers(req, res){
        User.find()
        //populate will replace the thoughts id
        // .populate({path: 'thoughts', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        // .select('-__v')
                .then((users) => res.json(users))         
                .catch((err) => res.status(500).json(err));
    },
    //get a single user
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId })
        // .populate({path: 'thoughts', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        // .select('-__v')
            .lean() //Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that id' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //create new user
    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
     //update user by if
    updateUserById(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
          )
            .then(async (user) =>
              !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
     //delete user
    deleteUserById(req, res){
        User.findOneAndRemove(
            { _id: req.params.userId },
            {new: true},
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that id' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    //add new friend
    addFriend(req, res){
        console.log('You are adding a friend.');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { new: true }
        )
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //remove friend
    removeFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: req.params.friendId } },
            { new: true },
          )
          .populate({path: 'friends', select: '-__v'})
          .select('-__v')
          .then((user) =>
              !user
                ? res.status(404).json({ message: 'No user found with that id.' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};