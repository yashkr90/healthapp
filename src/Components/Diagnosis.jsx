import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { dataAtom, showButtonAtom } from "../lib/atom";
import { useAtom, useSetAtom } from "jotai";
import Stack from "@mui/material/Stack";

const Diagnosis = (props) => {
  //   const [state, setState] = React.useState({
  //     gilad: true,
  //     jason: false,
  //     antoine: false,
  //   });
  const [data, setData] = useAtom(dataAtom);
  const setShowButtons = useSetAtom(showButtonAtom);

  const { diagnosisAndTest } = props;
  console.log("diagnosisandtst", diagnosisAndTest);
  const testName = diagnosisAndTest.test;
  const diagnosis = diagnosisAndTest.diagnosis;

  //   console.log("diagnosisItem", diagnosisItem)

  //   const initialState=diagnosisItem.map((item)=>{
  //     return {item:false}
  //   });

  // data=[
  //   {
  //     test: "ADAS-cog",
  //     diagnosis: { "adas-1": false, "adas-2": false, "adas-3": false },
  //   },
  //   {
  //     test: "MMSE",
  //     diagnosis: { "mmse-1": false, "mmse-2": false, "mmse-3": false },
  //   },
  //   {
  //     test: "FAB",
  //     diagnosis: { "fab-1": false, "fab-2": false, "fab-3": false },
  //   },
  // ];

  //   const initialStateObject = data.find((item) => item.test === testName);
  //     const initialState = initialStateObject
  //       ? initialStateObject.diagnosis
  //       : null;
  const [state, setState] = useState();

  useEffect(() => {
    getChecks();
  }, []);

  const getChecks = async () => {
    const initialStateObject = data.find((item) => item.test === testName);
    const initialState = initialStateObject
      ? initialStateObject.diagnosis
      : null;

    console.log(initialState);
    setState(initialState);
  };

  //   const initialState = diagnosis.reduce((acc, diagnosis) => {
  //     acc[diagnosis] = false;
  //     return acc;
  //   }, {});

  //   console.log(initialState);

  const handleChange = (event) => {
    console.log("event");
    // console.log(event);
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    // console.log(state);
  };

  //   useEffect(() => {
  //     console.log("state", state);

  //     // const updatedData = data.map((test) => {
  //     //   if (test.test === testName) {
  //     //     const updatedDiagnosis = { ...test.diagnosis, ...state };
  //     //     return { ...test, diagnosis: updatedDiagnosis };
  //     //   }
  //     //   return test;
  //     // });

  //     // console.log("updateddata", updatedData);
  //     // setData(updatedData);
  //   }, [state]);

  const handleSubmit = () => {
    const updatedData = data.map((test) => {
      if (test.test === testName) {
        const updatedDiagnosis = { ...test.diagnosis, ...state };
        return { ...test, diagnosis: updatedDiagnosis };
      }
      return test;
    });
    console.log("updateddata", updatedData);
    setData(updatedData);

    setShowButtons(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Stack spacing={2}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">{testName}</FormLabel>
          <FormGroup>
            {state
              ? diagnosis.map((diag) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          key={diag}
                          checked={state[diag]}
                          onChange={handleChange}
                          name={diag}
                        />
                      }
                      label={`${diag}`}
                    />
                  );
                })
              : ""}
          </FormGroup>
        </FormControl>
        <Button color="secondary" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default Diagnosis;
