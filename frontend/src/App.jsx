import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import ToDoForm from "./Components/ToDoForm/ToDoForm";
import TodoLists from "./Components/Listview/TodoLists";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from "@mui/material/CircularProgress";
import { createTodo, getTodos, updateTodo, deleteTodo } from "./api/todoApi";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState("add");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await getTodos();
    setTodos(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (data) => {
    setLoading(true);
    await createTodo(data);
    fetchTodos();
    setLoading(false);
    toast.success("Todo Added Successfully!");
  };

  const handleUpdate = async (data) => {
    await updateTodo(editData._id, data);
    fetchTodos();
    toast.success("Todo Updated Successfully!");
  };

  const handleAddOpen = () => {
    setDrawerMode("add");
    setEditData(null);
    setOpenDrawer(true);
  };

  const handleEditOpen = (todo) => {
    setDrawerMode("edit");
    setEditData(todo);
    setOpenDrawer(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTodo(selectedId);
      setConfirmOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    fetchTodos();
    toast.error("Todo Deleted Successfully!");
  };

  return (
    <div className="todo-app">
      <h2>Todo App</h2>
      <TodoLists
        todos={todos}
        loading={loading}
        handleOpenDrawer={handleAddOpen}
        handleEditOpen={handleEditOpen}
        setDrawerMode={setDrawerMode}
        handleDeleteConfirm={handleDeleteConfirm}
        confirmOpen={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      {/* Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{ width: 350, padding: 24 }}>
          <ToDoForm
            onSubmit={drawerMode === "add" ? handleAdd : handleUpdate}
            drawerMode={drawerMode}
            editData={editData}
            setOpenDrawer={setOpenDrawer}
          />
        </div>
      </Drawer>
      <ToastContainer position="top-right" autoClose={3000} />
      {loading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5000,
        }}
      >
        <CircularProgress size={70} />
      </div>
    )}
    </div>
  );
};

export default App;
