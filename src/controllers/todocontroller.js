const todocontroller = {};

import todoSchema from "../models/Todo.js"

todocontroller.getAll = async (req, res) => {
  try {
    const todoSchema = await Todos.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todos" });
  }
}

todocontroller.create = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = new todoSchema({ title, description, completed });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
}

todocontroller.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTodo = await todoSchema.findByIdAndUpdate(
      id,
        { title, description, completed },
        { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }   
    res.status(200).json(updatedTodo);
    } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
    }
}

todocontroller.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await todoSchema.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
}

todocontroller.getById = async (req, res) => {
  const { id } = req.params;
    try {
        const todo = await todoSchema.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving todo" });
    }
}


export default todocontroller;