const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} =require('../../controllers/userController.js');

//GET all users
router.route('/')
      .get(getUsers)

//Get a single user by id
router
    .route('/:userId')
    .get(getSingleUser)

//Create a new user
router
    .post(createUser);

//Update a user
router
    .put(updateUser);

//Delete a user
router  
    .delete(deleteUser);

//Add a friend
router  
    .route('/:id/friends/:friendId')
    .post(addFriend)

//Delete a friend
router
    .route('/:id/friends/:friendId')
    .delete(removeFriend);

module.exports = router;