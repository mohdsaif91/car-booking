import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { getToken } from "./API";

import Header from "./Components/Header/Header";
import Dashboard from "./Pages/Darshboard";
import SingleVehicle from "./Pages/SingleVehicle/indes";
import OrderSummary from "./Pages/orderSummary";

function App() {
  const { pathname } = useLocation();

  console.log(pathname, " JACK");

  useEffect(() => {
    if (!sessionStorage.getItem("tokenData")) getToken();
  }, []);

  return (
    <div className="main-app-container">
      {pathname != "/order-summary" && <Header />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/singleVehicle" element={<SingleVehicle />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
    </div>
  );
}

export default App;
