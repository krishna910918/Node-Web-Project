const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({

    task : {
        type : String,
        required  :true,
        default : ""
    }
}) ;

module.exports = mongoose.model('Task',taskSchema);