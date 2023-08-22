import {
  Grid,
  TextField,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { Field } from "formik";
import InputField from "./InputField";
import { Stack } from "@mui/system";

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const PatientDetails = (props) => {
  const { formik } = props;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <div
              style={{
                width: "195px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div>Name</div>
            </div>

            <InputField
              name="ptname"
              id="namept"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              // error={Boolean(formik.touched.password && formik.errors.password)}
              // onChange={formik.handleChange}
              // value={formik.values.password}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <div
              style={{
                width: "195px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div>Age</div>
            </div>
            <InputField
              name="age"
              label="Age"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              // error={Boolean(formik.touched.password && formik.errors.password)}
              // onChange={formik.handleChange}
              // value={formik.values.password}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <div
              style={{
                width: "195px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div>Sex</div>
            </div>
            <InputField
              name="sex"
              label="Sex"
              variant="filled"
              size="small"
              select
              defaultValue=""
              fullWidth
              // error={Boolean(formik.touched.password && formik.errors.password)}
              // onChange={formik.handleChange}
              // value={formik.values.password}
            >
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </InputField>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <div
              style={{
                width: "195px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div style={{display:"flex"}}>Associated Diagnosis</div>
            </div>
            <InputField
              name="associatedDiag"
              multiline
              maxRows={5}
              label="Associated Diagnosis"
              variant="filled"
              size="small"
              fullWidth
              // error={Boolean(formik.touched.password && formik.errors.password)}
              // onChange={formik.handleChange}
              // value={formik.values.password}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );

  // return(<>
  //     <h1>account</h1>
  // </>)
};

export default PatientDetails;
