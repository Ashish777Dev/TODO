const Task = require("./../models/task.js");

//ALL TASK
exports.allTask = async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json({
            status: "success",
            results: task.length,
            data: {
                task
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "No Task found!"
        });
    }
};

//CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                task: newTask
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "Failed to create task!"
        });
    }
};

//DELETE TASK
exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.findByIdAndDelete(id);

        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "Fail to delete task"
        });
    }
};

//UPDATE TASK
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        res.status(200).json({
            status: "success",
            data: {
                task: updatedTask
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "Failed to update task"
        });
    }
};

//DELETE ALL TASK
exports.deleteAllTask = async (req, res) => {
    try {
        await Task.deleteMany({});
        res.status(200).json({
            status: "success",
            message: "Data deleted successfully",
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: "success",
            message: "failed to delete all data"
        });
    }
};
