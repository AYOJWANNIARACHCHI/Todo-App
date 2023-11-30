const mongoose = require('mongoose');
const aggregatedPaginate = require('mongoose-aggregate-paginate');
require('dotenv').config();

const taskSchema = mongoose.Schema({
    TaskTitle: {
        type: String,
        maxLength: 100,
        required: [true, 'You Need a Task Title']
    },
    TaskDescription: {
        type: String,
        required: [true, 'You Need a Task Description']
    },
    TaskDate: {
        type: Date
    },
    TaskStatus: {
        type: String,
        required: true,
        enum: ['Created', 'In Progress', 'Completed'],
        default: 'Created',
        index: true
    }

});

taskSchema.plugin(aggregatedPaginate);

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task }