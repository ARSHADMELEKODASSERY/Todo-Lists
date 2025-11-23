import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  FormControl,
} from "@mui/material";

const ToDoForm = ({ editData, drawerMode, onSubmit, setOpenDrawer }) => {
  console.log("🚀 ~ ToDoForm ~ editData:", editData)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  useEffect(() => {
    if (drawerMode === "edit" && editData) {
      setFormData({
        title: editData.title,
        description: editData.description,
        status: editData.status,
      });
    }
  }, [drawerMode, editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setOpenDrawer(false);
    setFormData({ title: "", description: "", status: "Pending" });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 500,
        borderRadius: 3,
        mx: "auto",
        mt: 2,
        bgcolor: "#fafafa",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {drawerMode === "edit" ? "Edit To-Do" : "Add New To-Do"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
        />
        {drawerMode === "edit" && (
          <FormControl fullWidth margin="normal">
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                },
              }}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </TextField>
          </FormControl>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.3,
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          {drawerMode === "edit" ? "Update To-Do" : "Create To-Do"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ToDoForm;
