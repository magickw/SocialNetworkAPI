const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users <GET, POST>
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId <GET, PUT, DELETE>
router.route('/:userId').get(getSingleUser).put(updateUserById).delete(deleteUserById);

// /api/users/:userId/friends/ friendId <POST, DELETE>
router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;