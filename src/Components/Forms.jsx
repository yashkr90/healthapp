import MultiFormStep from "./MultiFormStep";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import PatientDetails from "./PatientDetails";
import BatteryOfTests from "./BatteryOfTests";
import { dataAtom } from "../lib/atom";
import { useAtom } from "jotai";

const Forms = () => {
  const [data, setData] = useAtom(dataAtom);

  return (
    <div>
      <MultiFormStep
        initialValues={{
          ptname: "",
          age: "",
          sex: "",
          associatedDiag:"",

          // confirmPassword: "",
        }}
        onSubmit={
          async (values) => {
            console.log("Wizard submit", values);
          }

          // sleep(300).then(() => console.log("Wizard submit", values))
        }
      >
        <FormStep
          onSubmit={(values) => console.log("Step1 onSubmit", values)}
          validationSchema={Yup.object({
            age: Yup.number().required("Please supply your age"),
            sex: Yup.string()
              .required("Select gender")
              .oneOf(["Male", "Female"]),
            ptname: Yup.string().required("Enter your name"),
            associatedDiag: Yup.string().required("Enter your diagnosis"),
          })}
        >
          {/* <h1>asdf</h1> */}
          <PatientDetails />
        </FormStep>
        <FormStep
          onSubmit={() => console.log("Step2 onSubmit")}
          // validationSchema={Yup.object({
          //   email: Yup.string()
          //     .email("Invalid email address")
          //     .required("required"),
          // })}
        >
          <BatteryOfTests />
        </FormStep>
      </MultiFormStep>
    </div>
  );
};

const FormStep = ({ children }) => children;

export default Forms;
