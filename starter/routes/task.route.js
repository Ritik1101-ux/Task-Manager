import express from 'express';
import {createTask, deleteTask, getAllTasks, getTask, updateTask} from '../controllers/task.controllers.js'

const taskRouter=express.Router();

taskRouter.route('/').get(getAllTasks).post(createTask);
taskRouter.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
  
export default taskRouter;