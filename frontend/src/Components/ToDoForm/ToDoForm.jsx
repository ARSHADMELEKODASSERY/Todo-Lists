import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const ToDoForm = ({ editData, drawerMode, onSubmit, setOpenDrawer }) => {
  console.log("🚀 ~ ToDoForm ~ drawerMode:", drawerMode)
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "Pending",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      setOpenDrawer(false);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (drawerMode === "edit" && editData) {
      formik.setValues({
        title: editData?.title,
        description: editData?.description,
        status: editData?.status,
      });
    }
        if (drawerMode === "view" && editData) {
      formik.setValues({
        title: editData?.title,
        description: editData?.description,
        status: editData?.status,
      });
    }
  }, [drawerMode, editData]);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 500,
        height: "88vh",
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
        {drawerMode === "view" ? "View To-Do" : drawerMode === "edit" ? "EDIT To-Do" : "ADD To-Do"}
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit}>
        {/* Title Field */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
          disabled={drawerMode === "view"}

        />

        {/* Description Field */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
          multiline
          rows={3}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
          disabled={drawerMode === "view"}
        />

        {/* Status — only in edit mode */}
        {drawerMode === "edit" || drawerMode === "view" ? (
          <FormControl fullWidth margin="normal">
            <TextField
              select
              label="Status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              SelectProps={{
                native: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                },
              }}
              disabled={drawerMode === "view"}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </TextField>
          </FormControl>
        ): null}

       {drawerMode !== "view" && (
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
          {drawerMode === "edit" ? "UPDATE To-Do" : "ADD To-Do"}
        </Button>)}
      </Box>
    </Paper>
  );
};

export default ToDoForm;
