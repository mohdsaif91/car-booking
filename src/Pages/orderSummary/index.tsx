import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getOrderById } from "../../Store/Slice/orderSlice";
import { TDispatch, Tstore } from "../../Store/store";

import orderSummaryStyle from "./index.module.scss";

const OrderSummary = (): JSX.Element => {
  const orderSummaryData = useSelector<Tstore, any>(
    (state) => state.order.submitedOrder
  );

  const dispatch = useDispatch<TDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderSummaryData) {
      const id = localStorage.getItem("orderId");
      dispatch(getOrderById(id));
    }
  }, []);

  const selectedCar = JSON.parse(localStorage.getItem("selectedCar") || "");

  return (
    <div className={orderSummaryStyle.container}>
      <h1>Thank you for the Booking {selectedCar.modalName}</h1>
      {orderSummaryData && (
        <div className={orderSummaryStyle.allText_container}>
          <div>
            <h3>{selectedCar.modalColor}</h3>
            <img src={selectedCar.carImage} />
          </div>
          <div className={orderSummaryData.text_container}>
            <h3>Order confirmed!</h3>
            <div className={orderSummaryStyle.varint_container}>
              <h4>
                {selectedCar.modalType}
                <div className={orderSummaryStyle.dot} />
              </h4>
              <h4>
                {selectedCar.transmissionType}
                <div className={orderSummaryStyle.dot} />
              </h4>
              <h4>
                {selectedCar.fuleType}
                <div className={orderSummaryStyle.dot} />
              </h4>
              <h4>{selectedCar.modalColor}</h4>
            </div>
            <h3>Total Amount: Rs.{orderSummaryData.Total}</h3>
            <h3>
              Order created on:{" "}
              {moment(orderSummaryData.DateCreated).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </h3>
            <h3>
              Order Submited on:{" "}
              {moment(orderSummaryData.DateSubmitted).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </h3>
          </div>
        </div>
      )}
      <div className={orderSummaryStyle.btn_container}>
        <button
          onClick={() => {
            navigate("/");
            // localStorage.setItem("stepperItem", "");
          }}
          className={`btn ${orderSummaryStyle.home_btn} c-p btn-active`}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
