import { configureStore } from "@reduxjs/toolkit";

import { orderReducer } from "./Slice/orderSlice";
import { stepperReducer } from "./Slice/stepperSlice";
import { userReducer } from "./Slice/userSlice";
import { vehicleReducer } from "./Slice/VehicleSlice";

const reducer = {
  stepper: stepperReducer,
  vehicle: vehicleReducer,
  user: userReducer,
  order: orderReducer,
};

export const store = configureStore({
  reducer,
});

export type Tstore = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
