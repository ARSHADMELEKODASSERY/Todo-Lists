import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import ToDoForm from "./Components/ToDoForm/ToDoForm";
import TodoLists from "./Components/Listview/TodoLists";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { createTodo, getTodos, updateTodo, deleteTodo } from "./api/todoApi";
import asset from "../../frontend/public/asset/asset.js";

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

  setTimeout(() => {
    setTodos(res.data);
    setLoading(false);
  }, 300); // Adds smooth loader visibility
};


  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (data) => {
    setLoading(true);
    await createTodo(data);
    fetchTodos();
    setTimeout(() => {
    setLoading(false);
    toast.success("Todo Added Successfully!");
  }, 1000);
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

    const handleViewOpen = (todo) => {
    setDrawerMode("view");
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
    toast.success("Todo Deleted Successfully!");
  };

  return (
    <div className="todo-app">
      <div className="" style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={asset.logo}
          alt="logo"
          className="w-16 h-16"
          style={{ width: "50px", height: "50px" }}
        />
        <h2 className="text-2xl font-bold mt-2" style={{ color: "#1976d2" }}>
          Todo App
        </h2>
      </div>
      <div
        className="mt-0"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {todos.length > 0 && (
          <p className="text-sm text-gray-500 mt-0" style={{color:"#4c4cb8"}}>
            Manage your tasks efficiently with Todo App
          </p>
        )}
      </div>

      <TodoLists
        todos={todos}
        loading={loading}
        handleOpenDrawer={handleAddOpen}
        handleEditOpen={handleEditOpen}
        handleViewOpen={handleViewOpen}
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
        <div style={{ width: 500, padding: 24 }}>
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
