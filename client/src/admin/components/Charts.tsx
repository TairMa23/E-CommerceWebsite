import React from "react";
import AverageRatingsChart from "./AverageRatingsChart";
import FavoriteStylesChart from "./FavoriteStylesChart";

function Charts() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ position: "relative", height: "300px", width: "400px" }}>
        <FavoriteStylesChart />
      </div>
      <div style={{ position: "relative", height: "300px", width: "400px" }}>
        <AverageRatingsChart />
      </div>
    </div>
  );
}

export default Charts;
