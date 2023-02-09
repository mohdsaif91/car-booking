import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Stepper from "../../Components/Stepper";
import FuleIcon from "../../assests/icon/Fuel.svg";
import TransmissionIcon from "../../assests/icon/Transmission.svg";
import SeatingIcon from "../../assests/icon/Seating.svg";
import {
  addCarImage,
  addDealer,
  addFule,
  addProductId,
  addSupplierId,
  addTransmission,
  addVariant,
  addVariantColor,
  getAddressBySupplierId,
  getCarVariantByFilter,
  getDealer,
  submitOrder,
} from "../../Store/Slice/VehicleSlice";
import { TDispatch, Tstore } from "../../Store/store";
import { nextStep, previousStep } from "../../Store/Slice/stepperSlice";
import {
  mobileNumberValidation,
  supplierAddresProps,
  userDetialsProps,
} from "../../util";
import SummaryPage from "./summary/SummaryPage";
import { addUserMobileNumber } from "../../Store/Slice/userSlice";
import {
  createOrderLintItem,
  orderCreation,
} from "../../Store/Slice/orderSlice";

import singlevehicleStyle from "./index.module.scss";
import { useNavigate } from "react-router-dom";

interface colorProps {
  colorValue: string;
  colorName: string;
}

interface cardData {
  cardData: [
    {
      fule: string[];
    },
    {
      seating: string[];
    },
    {
      transmission: string[];
    }
  ];
}

interface vehicleData {
  carConfig: {
    cardData: cardData[];
    color: colorProps[];
  };
}

interface dealerDataInterface {
  name: string;
  address: string;
}

interface selectedCarInterface {
  modalName: string;
  modalType: string;
  dealer: dealerDataInterface;
  fuleType: string;
  transmissionType: string;
  modalColor: string;
  supplierId: string;
  variantId: string;
  carImage: string;
}

interface dealerInterface {
  id: number;
  dealerName: string;
  address: string;
}

const initialBtnData = {
  petrol: false,
  manual: false,
  sixSeater: false,
};

const initialDetialsData = {
  name: "",
  email: "",
  termsAndCondition: false,
  subscribeWhatsApp: false,
};

let idOfDealer: any = null;

const SingleVehicle = (): JSX.Element => {
  const [carData] = useState<any>(
    useSelector<Tstore>((state) => state.vehicle.carConfig)
  );
  const [tabIndex, setTabIndex] = useState(
    useSelector<any>((state) => state.stepper.currentPageIndex) || 0
  );
  const [mainCarData, setMainCarData] = useState<any>();
  const [activeBtn, setActiveBtn] = useState({ ...initialBtnData });
  const [activeColor, setActiveColor] = useState(0);
  const [activeList, setActiveList] = useState<any>(null);
  const [optBtn, setotpBtn] = useState<boolean>(true);
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [showPersonalForm, setShowPersonalForm] = useState<boolean>(false);
  const [mobileInput, setMobileInput] = useState<any>({
    mobileNumber: "",
    optNumber: "",
  });
  const [userDetials, setUserDetails] = useState<userDetialsProps>({
    ...initialDetialsData,
  });
  // const [variantIndex, setVariantIndex] = useState<number>(0);
  const [selectedColorName, setSelectedColorName] =
    useState<string>("DEEP FOREST");
  const [variantIndex, setVariantIndex] = useState<number>(0);

  const carDataRedux = useSelector<Tstore>((state) => state.vehicle.carData);
  const stepperPageIndex =
    useSelector<any>((state) => state.stepper.currentPageIndex) || 0;
  const selectedModal = useSelector<Tstore, selectedCarInterface>(
    (state) => state.vehicle.selectedCar
  );
  const dealerIdData = useSelector<Tstore, any>(
    (state) => state.vehicle.dealerId
  );
  const dealerData = useSelector<Tstore, dealerInterface[]>(
    (state) => state.vehicle.dealerData
  );
  const supplierAddress = useSelector<Tstore, supplierAddresProps[]>(
    (state) => state.vehicle.supplierData
  );
  const userDetialsRedux = useSelector<Tstore, any>((state) => state.user);

  const dispatch = useDispatch<TDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCarVariantByFilter(activeBtn));
  }, [activeBtn]);

  useEffect(() => {
    if (stepperPageIndex != tabIndex) {
      setTabIndex(stepperPageIndex);
    }
  }, [stepperPageIndex]);

  useEffect(() => {
    setMainCarData(carDataRedux);
  }, [carDataRedux]);

  useEffect(() => {
    if (!carDataRedux) {
      dispatch(getCarVariantByFilter(activeBtn));
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(dealerIdData) && !idOfDealer) {
      idOfDealer = dealerIdData.map((f: any) => {
        dispatch(
          getAddressBySupplierId({ id: f.ID, idLength: dealerIdData.length })
        );
      });
    }
  }, [dealerIdData]);

  const getDealerMethod = () => {
    if (!dealerIdData) {
      dispatch(getDealer("SVn1m_gOek-2LBIqbq9Wpg"));
    }
  };

  const getColorByVariant = () => {
    const color = mainCarData[variantIndex].xp.Colours;

    return Object.keys(color).map((m: any, index: number) => {
      return (
        <div
          className={singlevehicleStyle.color_item_container}
          onClick={() => {
            setActiveColor(index);
            setSelectedColorName(m);
            dispatch(addVariantColor(m));
          }}
        >
          <div
            className={`${
              activeColor === index
                ? singlevehicleStyle.active_border
                : singlevehicleStyle.no_active_border
            }`}
          >
            <div
              style={{
                backgroundColor:
                  m === "DEEP FOREST"
                    ? "#3E4A2D"
                    : m === "NAPOLI BLACK"
                    ? "#000000"
                    : m === "DAZZLING SILVER"
                    ? "#7D8088"
                    : m === "EVEREST WHITE"
                    ? "#BAB9B9"
                    : m === "RED RAGE"
                    ? "#CA1118"
                    : "#8D8979",
              }}
              className={`${singlevehicleStyle.color_item} c-p ${
                activeColor === index
                  ? singlevehicleStyle.active_color_no_margin
                  : singlevehicleStyle.active_color_margin
              }`}
            />
          </div>
          {activeColor === index && (
            <div className={singlevehicleStyle.color_name}>{m}</div>
          )}
        </div>
      );
    });
  };

  const getScreenByTab = () => {
    let component = null;
    switch (true) {
      case tabIndex === 0:
        component = (
          <div className={singlevehicleStyle.car_option_container}>
            <div className={singlevehicleStyle.car_configuration}>
              <div className={singlevehicleStyle.card}>
                <div className={singlevehicleStyle.card_title_icon_container}>
                  <img src={FuleIcon} />
                  <h4 className={singlevehicleStyle.card_title}>Fuel</h4>
                </div>
                <div className={singlevehicleStyle.btn_container}>
                  <button
                    onClick={() => {
                      setActiveBtn({ ...activeBtn, petrol: false });
                      dispatch(addFule("Petrol"));
                    }}
                    className={`${singlevehicleStyle.card_btn} ${
                      !activeBtn.petrol && singlevehicleStyle.active_btn
                    } c-p`}
                  >
                    Diesel
                  </button>
                  <button
                    onClick={() => {
                      dispatch(addFule("Diesel"));
                      setActiveBtn({ ...activeBtn, petrol: true });
                    }}
                    className={`${singlevehicleStyle.card_btn} ${
                      activeBtn.petrol && singlevehicleStyle.active_btn
                    } c-p`}
                  >
                    Petrol
                  </button>
                </div>
              </div>
              <div className={singlevehicleStyle.card}>
                <div className={singlevehicleStyle.card_title_icon_container}>
                  <img src={TransmissionIcon} />
                  <h4 className={singlevehicleStyle.card_title}>
                    Transmission
                  </h4>
                </div>
                <div className={singlevehicleStyle.btn_container}>
                  <button
                    onClick={() => {
                      dispatch(addTransmission("Automatic"));
                      setActiveBtn({ ...activeBtn, manual: false });
                    }}
                    className={`${singlevehicleStyle.card_btn} ${
                      !activeBtn.manual && singlevehicleStyle.active_btn
                    } c-p`}
                  >
                    Automatic
                  </button>
                  <button
                    onClick={() => {
                      dispatch(addTransmission("Manual"));
                      setActiveBtn({ ...activeBtn, manual: true });
                    }}
                    className={`${singlevehicleStyle.card_btn} ${
                      activeBtn.manual && singlevehicleStyle.active_btn
                    } c-p`}
                  >
                    Manual
                  </button>
                </div>
              </div>
              <div className={singlevehicleStyle.card}>
                <div className={singlevehicleStyle.card_title_icon_container}>
                  <img src={SeatingIcon} />
                  <h4 className={singlevehicleStyle.card_title}>Seating</h4>
                </div>
                <div className={singlevehicleStyle.btn_container}>
                  <button
                    onClick={() =>
                      setActiveBtn({ ...activeBtn, sixSeater: true })
                    }
                    className={`${singlevehicleStyle.card_btn} ${
                      activeBtn.sixSeater && singlevehicleStyle.active_btn
                    } c-p`}
                  >
                    6 Seaters
                  </button>
                  <button
                    onClick={() => {
                      setActiveBtn({ ...activeBtn, sixSeater: false });
                    }}
                    className={`${singlevehicleStyle.card_btn} ${
                      !activeBtn.sixSeater && singlevehicleStyle.active_btn
                    } c-p`}
                  >
                    7 Seaters
                  </button>
                </div>
              </div>
              {/* ))} */}
            </div>
            <div className={singlevehicleStyle.car_colour}>
              <h2 className={singlevehicleStyle.colour_title}>
                Choose Colour:
              </h2>
              <div className={singlevehicleStyle.color_container}>
                {Array.isArray(mainCarData) && getColorByVariant()}
              </div>
            </div>
            <div className={singlevehicleStyle.car_variant}>
              <h2 className={singlevehicleStyle.colour_title}>
                Select Variant(
                {`${(Array.isArray(mainCarData) && mainCarData.length) || 0}`})
              </h2>
              <ul className={singlevehicleStyle.variant_container}>
                {Array.isArray(mainCarData) &&
                  mainCarData.map((m: any, index: number) => (
                    <li className={singlevehicleStyle.variant_item}>
                      <div>
                        <input
                          onChange={() => {
                            setVariantIndex(index);
                            dispatch(
                              addVariant({ name: m.Name, variantId: m.ID })
                            );
                          }}
                          name="varinat"
                          className="c-p"
                          id={m.Name}
                          type="radio"
                        />
                        <label
                          className={singlevehicleStyle.varint_name}
                          htmlFor={m.Name}
                        >
                          {m.Name}
                        </label>
                      </div>
                      <div>
                        <div>Starts at</div>
                        <div>
                          <span className="rupee-symbol" />
                          <span className={singlevehicleStyle.variant_price}>
                            {m.PriceSchedule.PriceBreaks[0].Price}*
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );
        break;
      case tabIndex === 1:
        component = (
          <div className={singlevehicleStyle.dealer_container}>
            <>{getDealerMethod()}</>
            <h2 className={singlevehicleStyle.colour_title}>Select Dealer</h2>
            <ul className={singlevehicleStyle.dealer_list_container}>
              {Array.isArray(supplierAddress) &&
                supplierAddress.map((m: supplierAddresProps, index: number) => (
                  <li
                    key={m.ID}
                    className={`${singlevehicleStyle.variant_item} c-p ${
                      Number.isInteger(activeList) &&
                      activeList === index &&
                      singlevehicleStyle.active_list
                    }`}
                    onClick={() => {
                      dispatch(
                        addDealer({
                          name: m.CompanyName,
                          address: `${m.City} ${m.Zip}`,
                        })
                      );
                      dispatch(addSupplierId(m.supplierId));
                      setActiveList(index);
                    }}
                  >
                    <div className={singlevehicleStyle.icon_text_container}>
                      {activeList === index ? (
                        <div className={singlevehicleStyle.tick_icon} />
                      ) : (
                        <div className={singlevehicleStyle.select_indicator} />
                      )}
                      <div className={singlevehicleStyle.address_container}>
                        <label
                          className={singlevehicleStyle.varint_name}
                          htmlFor={m.CompanyName}
                        >
                          {m.CompanyName}
                        </label>
                        <label
                          className={`${singlevehicleStyle.varint_name} ${singlevehicleStyle.secondary_address}`}
                          htmlFor={m.Street1}
                        >
                          {`${m.Street1} ${m.Street2}`}
                          <div>{`${m.City} ${m.Zip}`}</div>
                        </label>
                      </div>
                    </div>
                    {/* <div>
                      <div>Starts at</div>
                      <div>
                        <span className="rupee-symbol" />
                        <span className={singlevehicleStyle.variant_price}>
                          {m.}*
                        </span>
                      </div>
                    </div> */}
                  </li>
                ))}
            </ul>
          </div>
        );
        break;
      default:
      case tabIndex === 2:
        component = !showPersonalForm ? (
          <div className={singlevehicleStyle.detials_container}>
            <h2 className={singlevehicleStyle.colour_title}>
              Verify Mobile Number
            </h2>
            <div className={singlevehicleStyle.input_container}>
              <label className={singlevehicleStyle.mobile_label}>
                <span className={singlevehicleStyle.required_label}>*</span>
                Mandatory Fields
              </label>
              {showOtpInput ? (
                <input
                  placeholder="Enter OTP*"
                  onChange={(e) => {
                    setMobileInput({
                      ...mobileInput,
                      optNumber: e.target.value,
                    });
                  }}
                  value={mobileInput.optNumber}
                  type="number"
                  className={singlevehicleStyle.mobile_input_type}
                  // onBlur={() =>
                  //   mobileNumberValidation(mobileInput.mobileNumber || "")
                  // }
                />
              ) : (
                <input
                  value={mobileInput.mobileNumber}
                  type="number"
                  className={singlevehicleStyle.mobile_input_type}
                  onChange={(e) =>
                    setMobileInput({
                      ...mobileInput,
                      mobileNumber: e.target.value,
                    })
                  }
                  onBlur={() => {
                    dispatch(
                      addUserMobileNumber(
                        addUserMobileNumber(mobileInput.mobileNumber)
                      )
                    );
                    setotpBtn(mobileNumberValidation(mobileInput.mobileNumber));
                  }}
                />
              )}
              <label className={singlevehicleStyle.input_message}>
                {showOtpInput
                  ? "Get OTP On Call"
                  : "Enter your 10 digit mobile number and click on Continue"}
              </label>
            </div>
          </div>
        ) : (
          <div className={singlevehicleStyle.personal_container}>
            <h2 className={singlevehicleStyle.colour_title}>
              Personal Details
            </h2>
            <div className={singlevehicleStyle.mobile_number}>
              <div>Mobile number: {userDetialsRedux?.userMobile?.payload}</div>
              <div className={singlevehicleStyle.mandatory_lable}>
                <span className={singlevehicleStyle.required_label}>*</span>
                Mandatory Fields
              </div>
            </div>
            <div className={singlevehicleStyle.detials_input_container}>
              <input
                placeholder="Name"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetials,
                    name: e.target.value,
                  });
                }}
                value={userDetials.name}
                type="text"
                className={singlevehicleStyle.detials_input}
                onBlur={() =>
                  mobileNumberValidation(mobileInput.mobileNumber || "")
                }
              />
            </div>
            <div className={singlevehicleStyle.detials_input_container}>
              <input
                placeholder="Email"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetials,
                    email: e.target.value,
                  });
                }}
                value={userDetials.email}
                type="email"
                className={singlevehicleStyle.detials_input}
                onBlur={() =>
                  mobileNumberValidation(mobileInput.mobileNumber || "")
                }
              />
            </div>
            <div className={singlevehicleStyle.checkbox_container}>
              <div className={singlevehicleStyle.chebox_item_container}>
                <input
                  className={`${singlevehicleStyle.checkbox} c-p`}
                  type="checkbox"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetials,
                      termsAndCondition: e.target.checked,
                    })
                  }
                  checked={userDetials.termsAndCondition}
                />
                <label className={singlevehicleStyle.checkbox_label}>
                  By clicking this, you agree to our
                  <span className={singlevehicleStyle.underline}>
                    Terms and Conditions
                  </span>
                  and
                  <span className={singlevehicleStyle.underline}>
                    Privacy Policy
                  </span>
                </label>
              </div>
              <div className={singlevehicleStyle.chebox_item_container}>
                <input
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetials,
                      subscribeWhatsApp: e.target.checked,
                    })
                  }
                  className={`${singlevehicleStyle.checkbox} c-p`}
                  type="checkbox"
                  checked={userDetials.subscribeWhatsApp}
                />
                <label className={singlevehicleStyle.checkbox_label}>
                  Subscribe with WhatsApp
                </label>
              </div>
            </div>
          </div>
        );
        break;
      case tabIndex === 3:
        component = (
          <div className={singlevehicleStyle.summary_page}>
            <SummaryPage />
          </div>
        );
        break;
    }
    return component;
  };

  return (
    <div className={singlevehicleStyle.container}>
      <Stepper />
      <div className={singlevehicleStyle.car_image_options}>
        <div className={singlevehicleStyle.car_img_container}>
          {tabIndex !== 3 && (
            <div className={singlevehicleStyle.selected_car_container}>
              <h2 className={singlevehicleStyle.car_name}>
                {selectedModal.modalName}
              </h2>
              {tabIndex != 0 && (
                <div className={singlevehicleStyle.selected_car_item_container}>
                  <h2 className={singlevehicleStyle.car_name}>
                    {selectedModal.modalType}
                    <div className={singlevehicleStyle.dot} />
                  </h2>
                  <h2 className={singlevehicleStyle.car_name}>
                    {selectedModal.fuleType}
                    <div className={singlevehicleStyle.dot} />
                  </h2>
                  <h2 className={singlevehicleStyle.car_name}>
                    {selectedModal.transmissionType}
                    <div className={singlevehicleStyle.dot} />
                  </h2>
                  <h2 className={singlevehicleStyle.car_name}>
                    {selectedModal.modalColor}
                  </h2>
                </div>
              )}
              {tabIndex >= 2 && (
                <div className={singlevehicleStyle.dealer_container}>
                  <div className={singlevehicleStyle.dealer_name}>Dealer</div>
                  <div>
                    {selectedModal.dealer.name} {selectedModal.dealer.address}
                  </div>
                </div>
              )}
            </div>
          )}
          <img
            className={singlevehicleStyle.car_image}
            src={
              Array.isArray(mainCarData)
                ? mainCarData[variantIndex].xp.Colours[selectedColorName]
                : require("../../assests/image/scorpion8.webp")
            }
          />
        </div>
        <div className={singlevehicleStyle.tab_container}>
          {getScreenByTab()}
        </div>
      </div>
      <div className={singlevehicleStyle.button_container}>
        <button
          disabled={stepperPageIndex === 0}
          className="btn btn-transprent c-p"
          onClick={() => dispatch(previousStep(stepperPageIndex))}
        >
          Back
        </button>
        {tabIndex === 2 ? (
          !showOtpInput ? (
            <button
              disabled={optBtn}
              className={`btn ${optBtn ? "" : "c-p"} btn-active`}
              onClick={() => {
                setShowOtpInput(true);
              }}
            >
              Send OTP
            </button>
          ) : showPersonalForm ? (
            <button
              disabled={mobileInput.optNumber === ""}
              className={`btn ${
                mobileInput.optNumber === "" ? "" : "c-p"
              } btn-active`}
              onClick={() => {
                dispatch(
                  orderCreation(
                    selectedModal.supplierId ||
                      localStorage.getItem("supplierId")
                  )
                ).then((res) => {
                  if (res.payload) {
                    localStorage.setItem("orderId", res.payload.ID);
                    dispatch(
                      createOrderLintItem({
                        orderId: res.payload.ID,
                        variantId: selectedModal.variantId,
                      })
                    ).then((res) => {
                      if (res.payload) {
                        dispatch(nextStep(stepperPageIndex));
                      }
                    });
                  }
                });
              }}
            >
              Continue
            </button>
          ) : (
            <button
              disabled={mobileInput.optNumber === ""}
              className={`btn ${
                mobileInput.optNumber === "" ? "" : "c-p"
              } btn-active`}
              onClick={() => {
                setShowPersonalForm(true);
                // dispatch(nextStep(stepperPageIndex));
              }}
            >
              Verify OTP
            </button>
          )
        ) : tabIndex === 3 ? (
          <button
            className={`btn c-p btn-active`}
            onClick={() => {
              console.log("jI");
              dispatch(submitOrder(localStorage.getItem("orderId")));
              // dispatch(submitOrder("zxMpBasomUGAeUEGMkOEBA"));
              navigate("/order-summary");
            }}
          >
            confirm and Submit
          </button>
        ) : (
          <button
            disabled={selectedModal.modalType === "" || stepperPageIndex === 3}
            className={`btn ${
              (selectedModal.modalType !== "" || stepperPageIndex !== 4) &&
              "c-p"
            }  btn-active`}
            onClick={() => {
              dispatch(nextStep(stepperPageIndex));
              dispatch(addProductId(""));
              dispatch(
                addCarImage(
                  mainCarData[variantIndex].xp.Colours[selectedColorName]
                )
              );
            }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleVehicle;
