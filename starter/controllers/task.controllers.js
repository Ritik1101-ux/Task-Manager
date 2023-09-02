import taskModel from "../mongodb/models/task.js";
import asyncWrapper from "../middleware/async.js";
import {createCustomError} from "../errors/custom-error.js";

const getAllTasks = asyncWrapper( async (req, res) => {
        const tasks = await taskModel.find({});
        res.status(200).json({ tasks });
});

const createTask =asyncWrapper( async (req, res) => {

        const { name, completed } = req.body;

        const task = await taskModel.create({
            name,
            completed
        });

        res.status(200).json({ task });
});

const getTask =asyncWrapper(async (req, res,next) => {
        const id = req.params.id;

        const task = await taskModel.findOne({ _id: id });
        if (!task) {
           return next(createCustomError( `No task with Id: ${id}`,404));
        }
        res.status(200).json({ task });

});

const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, completed } = req.body;

        const task = await taskModel.findOneAndUpdate({ _id: id }, { name, completed }, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ message: `No task with Id: ${id}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ messgae: error.message });
    }
}

const deleteTask = async (req, res) => {

    try {
        const id = req.params.id;
        const task = await taskModel.findOneAndDelete({ _id: id });

        if (!task) {
            return res.status(404).json({ message: `No task with Id: ${id}` });
        }

        res.status(200).json({ task });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllTasks, createTask, getTask, deleteTask, updateTask }
