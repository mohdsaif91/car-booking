import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthenticatedApi, onAuthenticatedScync } from "../../API";

const supplierAddressArray: any = [];

export const getDealer = createAsyncThunk("vehicle/getDealer", (data: any) => {
  const api = {
    url: `/v1/products/${data}/suppliers`,
    method: "get",
  };

  return onAuthenticatedApi(api)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const getAllCarVariant = createAsyncThunk(
  "vehicle/getAllVariants",
  (data: any, { fulfillWithValue, rejectWithValue }) => {
    const api = {
      url: "/v1/me/products?catalogID=Vehicles&categoryID=SCORPIO-N&depth=2",
      method: "get",
    };
    // /v1/me/products?catalogID=Vehicles&categoryID=SCORPIO-N&depth=2&xp.Fuel=PETROL&xp.Transmission=AUTOMATIC&xp.Seating=7 SEATER
    return onAuthenticatedApi(api)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, " Error");
      });
  }
);

export const getCarVariantByFilter = createAsyncThunk(
  "vehicle/getCarVarintByFIlter",
  (data: any, {}) => {
    const api = {
      url: `/v1/me/products?catalogID=Vehicles&categoryID=SCORPIO-N&depth=2&xp.Fuel=${
        data.petrol ? "PETROL" : "DIESEL"
      }&xp.Transmission=${data.manual ? "MANUAL" : "AUTOMATIC"}&xp.Seating=${
        data.sixSeater ? "6 SEATER" : "7 SEATER"
      }`,
      method: "get",
    };

    return onAuthenticatedApi(api)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getAddressBySupplierId = createAsyncThunk(
  "vehicle/getAddressBySupplierId",
  (data: any) => {
    const api = {
      url: `/v1/suppliers/${data.id}/addresses`,
      method: "get",
    };
    return onAuthenticatedScync(api)
      .then((res) => {
        if (res.status === 200) {
          const addrData = res.data?.Items[0];

          supplierAddressArray.push({ ...addrData, supplierId: data.id });
          if (data.idLength === supplierAddressArray.length) {
            return supplierAddressArray;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const submitOrder = createAsyncThunk(
  "vehicle/submitOrder",
  (data: any) => {
    const api = {
      url: `/v1/orders/Outgoing/${data}/submit`,
      method: "post",
    };

    return onAuthenticatedApi(api)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    dealerId: null,
    supplierData: [],
    dealerData: [
      {
        id: 0,
        dealerName: `Hare Krishan Classic Car Cares Pvt. Ltd.MULUND, 400080`,
        address: `1, Udyog Kshetra, Mulund Goregaon Link Road, Mulund (West) Mumbai 400080 `,
      },
      {
        id: 1,
        dealerName: "Nbs International Ltd.CHOWPATTY, 400004",
        address: "10, Stone Building, Opp. Girgaon Chowpatty Mumbai 400004",
      },
    ],
    carData: null,
    carConfig: {
      cardData: [
        { title: "Fule", value: ["diesel", "petrol"] },
        {
          title: "Transmission",
          value: ["automatic", "manual"],
        },
        {
          title: "Seating",
          value: ["6 seater", "7 seater"],
        },
      ],
      color: [
        { colorValue: "#3E4A2D", colorName: "Deep Forest" },
        { colorValue: "#000000", colorName: "NAPOLI BLACK" },
        { colorValue: "#7D8088", colorName: "DAZZLING SILVER" },
        { colorValue: "#BAB9B9", colorName: "EVEREST WHITE" },
        { colorValue: "#CA1118", colorName: "RED RAGE" },
      ],
      carVariant: [
        {
          id: 0,
          modalType: "diesel",
          drive: "automatic",
          seater: 7,
          selected: false,
          variantName: "Z8 L D AT",
          variantPrice: "2164999.00",
        },
        {
          id: 1,
          modalType: "diesel",
          drive: "automatic",
          seater: 7,
          selected: false,
          variantName: "Z4 D AT",
          variantPrice: "1670200.00",
        },
      ],
    },
    selectedCar: localStorage.getItem("selectedCar")
      ? JSON.parse(localStorage.getItem("selectedCar") || "")
      : {
          modalId: "",
          modalName: "SCORPIO-N",
          modalType: "",
          fuleType: "Diesel",
          transmissionType: "Automatic",
          dealer: {
            name: "",
            address: "",
          },
          modalColor: "DEEP FOREST",
          supplierId: "",
          variantId: "",
          carImage: "",
        },
  },
  reducers: {
    getCarDetials: (state: any, action: PayloadAction<any>) => {
      if (action.payload === "modalType") {
        state.selectedCar.modalType = "";
      }
    },
    addDealer: (state: any, action: PayloadAction<any>) => {
      state.selectedCar.dealer = action.payload;
      localStorage.setItem("selectedCar", JSON.stringify(state.selectedCar));
    },
    addFule: (state: any, action: PayloadAction<any>) => {
      state.selectedCar.fuleType = action.payload;
      localStorage.setItem("selectedCar", JSON.stringify(state.selectedCar));
    },
    addVariant: (state: any, action: PayloadAction<any>) => {
      state.selectedCar.modalType = action.payload.name;
      state.selectedCar.variantId = action.payload.variantId;
      localStorage.setItem("selectedCar", JSON.stringify(state.selectedCar));
    },
    addTransmission: (state: any, action: PayloadAction<any>) => {
      state.selectedCar.transmissionType = action.payload;
      localStorage.setItem("selectedCar", JSON.stringify(state.selectedCar));
    },
    addProductId: (state: any, action: PayloadAction<any>) => {
      state.selectedCar.modalId = action.payload;
      localStorage.setItem("selectedCar", JSON.stringify(state.selectedCar));
    },
    addCarImage: (state: any, action: PayloadAction<any>) => {
      state.selectedCar.carImage = action.payload;
      localStorage.setItem("selectedCar", JSON.stringify(state.selectedCar));
    },
    addSupplierId: (state: any, action: PayloadAction<any>) => {
      localStorage.setItem("supplierId", action.payload);
      state.selectedCar.supplierId = action.payload;
    },
    addVariantColor: (state: any, action: PayloadAction<any>) => {
      state.selectedCar.modalColor = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(getAllCarVariant.fulfilled, (state: any, action: any) => {
      return {
        ...state,
        carData: action.payload.Items,
      };
    });
    builder.addCase(
      getCarVariantByFilter.fulfilled,
      (state: any, action: any) => {
        return {
          ...state,
          carData: action.payload.Items,
        };
      }
    );
    builder.addCase(
      getDealer.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        return {
          ...state,
          dealerId: action.payload.Items,
        };
      }
    );
    builder.addCase(
      getAddressBySupplierId.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        return {
          ...state,
          supplierData: action.payload,
        };
      }
    );
  },
});

export const vehicleReducer = vehicleSlice.reducer;
export const {
  addCarImage,
  addDealer,
  addFule,
  addProductId,
  addSupplierId,
  addTransmission,
  addVariant,
  addVariantColor,
} = vehicleSlice.actions;
