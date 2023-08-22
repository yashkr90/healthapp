import {atom} from 'jotai';


const testObj = [
    { test: "ADAS-cog", diagnosis: ["adas-1", "adas-2", "adas-3"] },
    { test: "MMSE", diagnosis: ["mmse-1", "mmse-2", "mmse-3"] },
    { test: "FAB", diagnosis: ["fab-1", "fab-2", "fab-3"] },
    {
      test: "GAIT speed measurement",
      diagnosis: ["gait-1", "gait-2", "gait-3"],
    },
  ];

  const initialData=testObj.map((value)=>{
    const transformedDiagnosis = value.diagnosis.reduce((result,diag)=>{
        result[diag]=false;
        return result;
    },{})

    return { test: value.test, diagnosis: transformedDiagnosis };
})

// [
//     {
//       test: "ADAS-cog",
//       diagnosis: { "adas-1": false, "adas-2": false, "adas-3": false },
//     },
//     {
//       test: "MMSE",
//       diagnosis: { "mmse-1": false, "mmse-2": false, "mmse-3": false },
//     },
//     {
//       test: "FAB",
//       diagnosis: { "fab-1": false, "fab-2": false, "fab-3": false },
//     },
//   ];
  
export const dataAtom= atom(initialData)

export const showButtonAtom= atom(true);

export const noOfButtonClickedAtom= atom([])