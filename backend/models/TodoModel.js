import e from 'express';
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'In-Progress', 'Completed'],
    default: 'Pending',
  }
},{timestamps: true});

const TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;