const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUserById,
    deleteUserById,
    addNewFriend,
    removeFriend,
} = require('../../controllers/userController.js');

// /api/users <GET, POST>
router.route('/').get(getUsers).post(createNewUser);

// /api/users/:userId <GET, PUT, DELETE>
router.route('/:userId').get(getSingleUser).put(updateUserById).delete(deleteUserById);

// /api/users/:userId/friends/ friendId
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend);

module.exports = router;