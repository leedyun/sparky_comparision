import React from "react";

const CustomNextArrow = ({ onClick }) => {
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
      <img src="rightArrow.png" alt="right" />
    </button>
  );
};

export default CustomNextArrow;
