import React, { Children } from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const InputField = ({children, label, ...props }) => {
  const [field, meta] = useField(props);
  // console.log(children);
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    //   onChange={meta.handleChange}
    //   value={meta.values.email}
    >
      {children}
    </TextField>
  );
};

export default InputField;
