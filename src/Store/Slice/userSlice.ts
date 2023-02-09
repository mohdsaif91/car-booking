import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userMobile: "",
    userName: "",
    userEmail: "",
    termsAndCondition: false,
    subscribeWhatsApp: false,
  },
  reducers: {
    addUserMobileNumber: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        userMobile: action.payload,
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUserMobileNumber } = userSlice.actions;
