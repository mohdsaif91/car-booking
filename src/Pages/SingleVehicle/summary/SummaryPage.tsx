import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrderById } from "../../../Store/Slice/orderSlice";
import { TDispatch, Tstore } from "../../../Store/store";

import summaryStyle from "./index.module.scss";

const SummaryPage = (): JSX.Element => {
  const orderData = useSelector<Tstore, any>(
    (state) => state.order.createdOrder
  );

  const selectedModal = JSON.parse(localStorage.getItem("selectedCar") || "");

  return (
    <div className={summaryStyle.summary_containe}>
      {orderData ? (
        <>
          <div className="mb-2">Order no:- {orderData.ID}</div>
          {/* <div className="mb-2">Order status:- Submitted</div> */}
          <div className={summaryStyle.varint_container}>
            <h2 className={summaryStyle.car_name}>{selectedModal.modalName}</h2>
            <div className={summaryStyle.selected_car_item_container}>
              <div className={summaryStyle.card_details}>
                <h2 className={summaryStyle.car_name}>
                  {selectedModal.modalType}
                  <div className={summaryStyle.dot} />
                </h2>
                <h2 className={summaryStyle.car_name}>
                  {selectedModal.fuleType}
                  <div className={summaryStyle.dot} />
                </h2>
                <h2 className={summaryStyle.car_name}>
                  {selectedModal.transmissionType}
                  <div className={summaryStyle.dot} />
                </h2>
                <h2 className={summaryStyle.car_name}>
                  {selectedModal.modalColor}
                </h2>
              </div>
            </div>
            <div className={summaryStyle.dealer_container}>
              <div className={summaryStyle.dealer_name}>Dealer</div>
              <div>
                {selectedModal.dealer.name} {selectedModal.dealer.address}
              </div>
            </div>
          </div>
          {/* <div className="mb-2">Created Date:- {orderData.DateCreated}</div>
          <div className="mb-2">Order status:- Submitted</div> */}
        </>
      ) : (
        "NO DATA"
      )}
    </div>
  );
};

export default SummaryPage;
