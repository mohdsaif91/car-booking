import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthenticatedApi } from "../../API";

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  (data: any, {}) => {
    const api = {
      url: `/v1/orders/Outgoing/${data}`,
      method: "get",
    };

    return onAuthenticatedApi(api)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const orderCreation = createAsyncThunk(
  "order/orderCreation",
  (data: any, {}) => {
    const api = {
      url: `/v1/orders/Outgoing`,
      method: "post",
      data: {
        ToCompanyID: data,
      },
    };
    return onAuthenticatedApi(api)
      .then((res) => {
        if (res.status === 201) {
          return res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const createOrderLintItem = createAsyncThunk(
  "vehicle/createOrderLintItem",
  (data: any, {}) => {
    const api = {
      url: `/v1/orders/Outgoing/${data.orderId}/lineitems`,
      method: "post",
      data: {
        ProductID: data.variantId,
        Quantity: 1,
      },
    };

    return onAuthenticatedApi(api)
      .then((res) => {
        if (res.status === 201) {
          return res.data;
        }
      })
      .catch((err) => console.log(err));
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    createdOrder: null,
    submitedOrder: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      orderCreation.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        return {
          ...state,
          createdOrder: action.payload,
        };
      }
    );
    builder.addCase(
      createOrderLintItem.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        return {
          ...state,
          createdOrder: action.payload,
        };
      }
    );
    builder.addCase(
      getOrderById.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        console.log(action.payload);

        return {
          ...state,
          submitedOrder: action.payload,
          //   createdOrder: action.payload,
        };
      }
    );
  },
});

export const orderReducer = orderSlice.reducer;
