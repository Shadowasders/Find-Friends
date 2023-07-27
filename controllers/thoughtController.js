const Thought = require('../models/Thought');
const Reaction  = require('../models/Thought')
module.exports ={
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.thoughtId});

            if (!thoughts) {
                return res.status(400).json({ message: "no thought w/that id"})
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete ({ _id: req.params.thoughtId});

            if (!thought){
                return res.status(404).json({ message: "No Thought found"});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate ({ _id: req.params.thoughtId},
                {
                    $set: req.body
                },
                {
                    runValidators: true,
                    new: true,
                });

                if(!thought) {
                    return res.status(404).json({ message: "No thought found!"})
                }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId},
                {
                    $push: {reactions: req.params.thoughtId}
                },
                {
                    new: true,
                });

                if(!thought) {
                    return res.status(404).json({message: "Thought not found!"});
                }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate ({ _id: req.params.thoughtId},
                {
                    $pull: {reactions: req.params.thoughtId}
                },
                {
                    new: true,
                });

                if(!thought) {
                    return res.status(404).json({ message: "Thought not found"});
                }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}