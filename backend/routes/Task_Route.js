const express = require('express');
let router = express.Router();

const { Task } = require('../models/task_model');

//add article
router.route("/add").post(async (req, res) => {
    try {
        const task = new Task({
            ...req.body
        });
        const result = await task.save();
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ message: 'Error Adding Task', error });
    }
});

//Get and update Task by ID
router.route('/task/:id').get(async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findById(_id);
        if (!Task || task.length === 0) {
            return res.status(400).json({ message: 'Task not Found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error Fectching Task', error: error })
    }
}).delete(async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndRemove(_id);
        if (!task) return res.status(400).json({ message: 'Task not Found' });
        res.status(200).json("Task Deleted");
    } catch (error) {
        res.status(400).json({ message: 'Error Deleting Task', error: error });
    }
}).patch(async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndUpdate(
            { _id },
            {
                "$set": req.body
            },
            { new: true }
        );

        if (!task) return res.status(400).json({ message: 'Task not Found' });
        res.status(200).json(task);

    } catch (error) {
        res.status(400).json({ message: 'Error Updating Task', error: error });
    }
});

router.route("/").get(async (req, res) => {
    try {

        //const _id = req.params.id;
        const task = await Task.find();

        if (!task || task.length === 0) {
            return res.status(400).json({ message: 'Task not Found' });
        }
        res.status(200).json(task);

    } catch (error) {
        res.status(400).json({ message: 'Error Fectching Task', error });
    }
});

module.exports = router;