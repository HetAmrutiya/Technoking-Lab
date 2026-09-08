import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
