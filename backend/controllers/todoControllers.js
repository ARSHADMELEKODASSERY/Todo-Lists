import TodoModel from '../models/TodoModel.js';

export const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTodo = new TodoModel({
      title,
      description,
      status,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TodoModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
