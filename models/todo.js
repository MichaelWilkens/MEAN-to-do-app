const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Todo = new Schema({
    title: {
        type:String
    }, 
    isDone: {
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', Todo);