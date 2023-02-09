import React from "react";
import { useNavigate } from "react-router-dom";

import dashboardStyle from "./index.module.scss";

const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      className={`${dashboardStyle.container} c-p`}
      onClick={() => navigate("/singleVehicle")}
    >
      <div className={dashboardStyle.img_container}>
        <img src={require("../../assests/image/scorpoiHeroImg.webp")} alt="" />
      </div>
    </div>
  );
};

export default Dashboard;
