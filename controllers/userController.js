const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Add a friend
    addFriend({params},res) {
        User.findByIdAndUpdate(
            {_id: params.id},
            {$addToSet: {friends:params.friendId } },
            {new: true}
        )
        .select("-__v")
        .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({message: "No user found with this id!"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
    },
    removeFriend({params}, res) {
        User.findByIdAndUpdate(
            {_id: params.id},
            {$pull: {friends:params.friendId}},
            {new: true, runValidators: true}
        )
        .select("-__v")
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({message: "No friend found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
};
