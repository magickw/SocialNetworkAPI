const { User, Thought } = require('../models');

module.exports = {
    //get all users
    getUsers(req, res){
        User.find()
                .then(async (users) => res.json(users))         
                .catch((err) => res.status(500).json(err));
    },
    //get a single user
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId }).select('-__v')
            .lean()
            .then(async (user) =>
            !user
                ? res.status(404).json({ message: 'No user with that id' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //create new user
    createNewUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
     //create user
    updateUserById(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
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
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that id' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    //add new friend
    addNewFriend(req, res){
        console.log('You are adding a friend.');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that id.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //remove friend
    removeFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that id.' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};