const Thought = require('../models/Thought');

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
            const thought
        }
    }
}