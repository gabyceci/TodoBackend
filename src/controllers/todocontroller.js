import Todo from "../models/Todo.js"  // Cambiado: importar el modelo, no el schema

const todocontroller = {};

todocontroller.getAll = async (req, res) => {
  try {
    const todos = await Todo.find();  // Cambiado: usar Todo en lugar de Todos
    res.status(200).json(todos);      // Cambiado: usar todos en lugar de todoSchema
  } catch (error) {
    console.error("Error en getAll:", error);
    res.status(500).json({ message: "Error retrieving todos" });
  }
}

todocontroller.create = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = new Todo({ title, description, completed });  // Cambiado: usar Todo
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error en create:", error);
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
}

todocontroller.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(  // Cambiado: usar Todo
      id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }   
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error en update:", error);
    res.status(500).json({ message: "Error updating todo" });
  }
}

todocontroller.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);  // Cambiado: usar Todo
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error en delete:", error);
    res.status(500).json({ message: "Error deleting todo" });
  }
}

todocontroller.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);  // Cambiado: usar Todo
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error("Error en getById:", error);
    res.status(500).json({ message: "Error retrieving todo" });
  }
}

export default todocontroller;