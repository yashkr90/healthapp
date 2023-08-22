import React, { useState, useEffect } from "react";
import { Button, Stack, Box } from "@mui/material";
import Diagnosis from "./Diagnosis";
import { dataAtom, showButtonAtom, noOfButtonClickedAtom } from "../lib/atom";
import { useAtom } from "jotai";

const testObj = [
  { test: "ADAS-cog", diagnosis: ["adas-1", "adas-2", "adas-3"] },
  { test: "MMSE", diagnosis: ["mmse-1", "mmse-2", "mmse-3"] },
  { test: "FAB", diagnosis: ["fab-1", "fab-2", "fab-3"] },
  {
    test: "GAIT speed measurement",
    diagnosis: ["gait-1", "gait-2", "gait-3"],
  },
];

// const initialData = testObj.map((test) => {
//     const transformedDiagnosis = test.diagnosis.reduce((result, diagnosis) => {
//       result[diagnosis] = false;
//       return result;
//     }, {});

const initialData = testObj.map((value) => {
  const transformedDiagnosis = value.diagnosis.reduce((result, diag) => {
    result[diag] = false;
    return result;
  }, {});

  return { test: value.test, diagnosis: transformedDiagnosis };
});

const BatteryOfTests = () => {
  console.log("tests");
  const [showButtons, setShowButtons] = useAtom(showButtonAtom);
  const [noOfButtonClicked, setNoOfButtonClicked] = useAtom(
    noOfButtonClickedAtom
  );

  const [data, setData] = useAtom(dataAtom);

  const [diagnosisAndTest, setDiagnosisAndTest] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);

  const handleClick = (e, value) => {
    console.log(e.target.name);
    if (!clickedButtons.includes(value.test)) {
      setClickedButtons([...clickedButtons, value.test]);
    }
    console.log(value);
    if (!noOfButtonClicked.includes(value.test)) {
      setNoOfButtonClicked((prevClickedButtons) => [
        ...prevClickedButtons,
        value.test,
      ]);
    }
    setDiagnosisAndTest(value);
    console.log(diagnosisAndTest);
    setShowButtons(false);
  };

  useEffect(() => {
    // This code will run after diagnosisAndTest has been updated.
    console.log(diagnosisAndTest);
    console.log(data);
    // setShowButtons(false);
  }, [diagnosisAndTest, showButtons]);

  return (
    <>
      <Box sx={{width:'80vw'}}>
        <Stack spacing={2}>
          {showButtons === true ? (
            testObj.map((value) => {
              return (
                <Button
               
                  color={
                    clickedButtons.includes(value.test)
                      ? "success"
                      : "secondary"
                  }
                  key={value.test}
                  name={value.test}
                  variant={
                    clickedButtons.includes(value.test)
                      ? "contained"
                      : "outlined"
                  }
                  onClick={(e) => handleClick(e, value)}
                >
                  {value.test}
                  
                </Button>
              );
            })
          ) : (
            <Diagnosis diagnosisAndTest={diagnosisAndTest} />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default BatteryOfTests;
