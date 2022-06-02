import React from "react";
import { loaderIcon } from "../../icons";

const Loader = () => (
  <div
    style={{
      position: "absolute",
      top: "40%",
      left: "50%",
      width: "150px",
      height: "150px",
    }}
  >
    {loaderIcon}
  </div>
);

export default Loader;
