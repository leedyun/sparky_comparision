import React from "react";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: 24,
        height: 24,
        border: "none",
        background: "none",
        display: "flex",
      }}
    >
      <img src="leftArrow.png" alt="left" />
    </button>
  );
};

export default CustomPrevArrow;
