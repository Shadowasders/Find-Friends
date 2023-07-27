const { Thought } = require('../models');
const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId});

            if (!user) {
                return res.status(404).json({ message: "no user with that id"})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete ({ _id: req.params.userId});

            if (!user){
                return res.status(404).json({message: "no user found"});
            }

            await Thought.deleteMany({ _id: {$in: user.thoughts }});
            res.json({ message: "User and thought deleted!"})
        } catch (err){
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate ({
                _id: req.params.userId
            },
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true,
            });

            if(!user) {
                return res.status(404).json({ message: "user not found!"});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate ({ _id: req.params.userId },
                {
                    $addToSet: {friends: req.params.friendId}
                },
                {
                    new: true,
                });

                if(!user) {
                    return res.status(404).json({ message: "user not found!"});
                }
            } catch (err) {
                res.status(500).json(err);
            }
        },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate ({ _id: req.params.userId},
                {
                    $pull: {friends: req.params.friendId}
                },
                {
                    new: true,
                });
                if(!user) {
                    return res.status(404).json({ message: "user not found!"});
                }
            } catch (err) {
                res.status(500).json(err);
            }
        }
};