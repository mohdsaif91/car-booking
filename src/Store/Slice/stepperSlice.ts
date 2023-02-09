import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const stepperSlice = createSlice({
  name: "stepper",
  initialState: localStorage.getItem("stepperItem")
    ? JSON.parse(localStorage.getItem("stepperItem") || "")
    : {
        stepperSteps: [
          {
            id: 0,
            textValue: "vehicle",
            active: true,
            done: false,
          },
          { id: 1, textValue: "dealer", active: false, done: false },
          { id: 2, textValue: "details", active: false, done: false },
          { id: 3, textValue: "summary", active: false, done: false },
        ],
        currentPageIndex: 0,
      },
  reducers: {
    nextStep: (state: any, action: PayloadAction<any>) => {
      const currentStepper = current(state);
      const { stepperSteps, currentPageIndex } = currentStepper;

      const deepCopyObject = JSON.parse(JSON.stringify(stepperSteps));
      deepCopyObject[action.payload + 1].active = true;
      if (action.payload === 2) {
        deepCopyObject[action.payload + 1].done = true;
        deepCopyObject[action.payload].done = true;
      } else {
        deepCopyObject[action.payload].done = true;
      }
      state.stepperSteps = deepCopyObject;
      state.currentPageIndex = currentPageIndex + 1;
      localStorage.setItem("stepperItem", JSON.stringify(state));
    },
    previousStep: (state: any, action: PayloadAction<any>) => {
      const currentStepper = current(state);
      const { stepperSteps, currentPageIndex } = currentStepper;
      const deepCopyObject = JSON.parse(JSON.stringify(stepperSteps));
      deepCopyObject[action.payload - 1].active = true;
      deepCopyObject[action.payload - 1].done = false;
      deepCopyObject[action.payload].done = false;
      deepCopyObject[action.payload].active = false;
      state.stepperSteps = deepCopyObject;
      state.currentPageIndex = currentPageIndex - 1;
      localStorage.setItem("stepperItem", JSON.stringify(state));
    },
  },
});

export const stepperReducer = stepperSlice.reducer;
export const { nextStep, previousStep } = stepperSlice.actions;
