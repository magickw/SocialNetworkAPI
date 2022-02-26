const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/userController.js');

// /api/users <GET, POST>
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId <GET, PUT, DELETE>
router.route('/:userId').get(getSingleUser).put(updateUserById).delete(deleteUserById);

// /api/users/:userId/friends/ friendId <POST, DELETE>
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;