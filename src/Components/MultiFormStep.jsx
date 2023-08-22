import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAtomValue } from "jotai";
import { dataAtom, showButtonAtom, noOfButtonClickedAtom } from "../lib/atom";
import { Button, Stack } from "@mui/material";

const MultiFormStep = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const data = useAtomValue(dataAtom);
  const showButtons = useAtomValue(showButtonAtom);
  const noOfButtonClicked = useAtomValue(noOfButtonClickedAtom);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    console.log(snapshot);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      //storing data of diagnosis and user details in result
      const result = { ...values, data: data };
      return onSubmit(result, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          {/* <p>
              Step {stepNumber + 1} of {totalSteps}
            </p> */}
          <Stack spacing={4}>
            <div>{step}</div>

            <Stack direction="row" >
              
              
                {showButtons ? (
                  <div style={{ display: "flex" }}>
                    {stepNumber > 0 && (
                      <button
                        onClick={() => previous(formik.values)}
                        type="button"
                      >
                        Back
                      </button>
                    )}
                    <div>
                      {isLastStep ? (
                        <Button
                          variant="contained"
                          color="success"
                          type="submit"
                          disabled={noOfButtonClicked.length !== data.length}
                        >
                          Generate reports
                        </Button>
                      ) : (
                        <Button
                          disabled={formik.isSubmitting}
                          type="submit"
                          variant="contained"
                        >
                          {stepNumber === 0 ? "Select Tests" : "Next"}
                        </Button>
                      )}
                      {/* <button disabled={formik.isSubmitting} type="submit">
                  {stepNumber === 0 ? "Select Tests" : "Next"}
                </button> */}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default MultiFormStep;
