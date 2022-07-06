
const Task = require('../models/task');

exports.addTask = async(req,res) => {

    let { task} = req.body;
    try {

        let result = await Task.create({task});

        return {message : "Task added successfully"}

    } catch (error) {

        return {message : "Something went wrong"}
    }
}

exports.getTasks = async(req,res) => {

    
    try {

        let tasks = await Task.find();

        return {tasks}

    } catch (error) {

        return {message : "Something went wrong"}
    }
}

exports.updateTask = async(req,res) => {

    let { task} = req.body;
    let {id} = req.params;
    try {

        let result = await Task.findByIdAndUpdate(id,{task},{new : true});

        return {message : "Task updated successfully"}

    } catch (error) {

        return {message : "Something went wrong"}
    }
}

exports.deleteTask = async(req,res) => {

    let { id} = req.params;
    try {

        let result = await Task.findByIdAndDelete(id);

        return {message : "Task deleted successfully"}

    } catch (error) {

        return {message : "Something went wrong"}
    }
}