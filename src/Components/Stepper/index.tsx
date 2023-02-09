import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Tstore } from "../../Store/store";
import RightTick from "../../assests/icon/rightTick.webp";

import stepperStyle from "./index.module.scss";

const initialData = {
  stepperSteps: [
    {
      id: 0,
      textValue: "vehicle",
      active: true,
      done: false,
    },
    { id: 1, textValue: "dealer", active: false, done: false },
    { id: 2, textValue: "detials", active: false, done: false },
    { id: 3, textValue: "summary", active: false, done: false },
  ],
};

interface stepperItem {
  id: number;
  textValue: string;
  active: boolean;
  done: boolean;
}

const Stepper = (): JSX.Element => {
  const [steps, setSteps] = useState<stepperItem[]>(initialData.stepperSteps);

  const stepperData = useSelector<Tstore, stepperItem[]>(
    (state) => state.stepper.stepperSteps
  );

  return (
    <div className={stepperStyle.container}>
      {stepperData.map((m: stepperItem, index: number) => (
        <div className={stepperStyle.step_item}>
          <div
            className={`${stepperStyle.text_value} ${
              m.active && stepperStyle.active_font
            }`}
          >
            {m.textValue}
          </div>
          <div className={stepperStyle.text_circle}>
            <div
              className={`${
                m.active && m.done
                  ? stepperStyle.done_icon
                  : m.active
                  ? stepperStyle.active_circle
                  : ""
              } ${stepperStyle.step_circle}`}
            />
            {/* {index + 1 < steps.length && ( */}
            {m.textValue != "summary" ? (
              <div
                className={`${m.active && stepperStyle.active_line} ${
                  stepperStyle.step_line
                }`}
              />
            ) : (
              <></>
            )}
            {/* )} */}
          </div>
        </div>
      ))}
      {/* <div className={stepperStyle.ex_showroom_price_container}>
        <div className={stepperStyle.ex_showroom_item}>
          *Ex-Showroom Price: <span className={stepperStyle.city}>Mumbai</span>
          <img src={require("../../assests/icon/location-icon.webp")} />
        </div>
      </div> */}
    </div>
  );
};

export default Stepper;
