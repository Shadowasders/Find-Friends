const { Thought, User } = require('../models');
module.exports =
//get all users
{
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: "no user with that id" })
            }

            res.json(user);
            console.log("user created!")
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndRemove(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: "no user found" });
            }

             await Thought.deleteMany({
                username: user.username
            });
            res.json({ message: "User and thoughts deleted!" })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true, });

            if (!user) {
                return res.status(404).json({ message: "user not found!" });
            }
            res.json({message: "user has been updated!"})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);
                if (!friend) {
                    return res.status(404).json({ message: "No friend by that ID found"});
                }
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friend }},
                { runValidators: true, new: true, });

            if (!user) {
                return res.status(404).json({ message: "user not found!" });
            }
            res.json({message: "Friend added!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete a friend
    async deleteFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);
                if (!friend) {
                    return res.status(404).json({ message: "No friend by that ID found"});
                }
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: friend._id } },
                { runValidators: true, new: true, });
            if (!user) {
                return res.status(404).json({ message: "user not found!" });
            }
            res.json({message: "friend deleted"})
        } catch (err) {
            res.status(500).json(err);
        }
    }
};