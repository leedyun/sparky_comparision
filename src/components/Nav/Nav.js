import React, { useState } from "react";
import { PrimaryNav, Menu } from "./NavElement";

const Nav = ({ onSelectMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState("chart");

  const handleMenuClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
    }

    if (onSelectMenu) {
      onSelectMenu(menu);
    }
  };

  return (
    <PrimaryNav>
      <Menu
        onClick={() => handleMenuClick("chart")}
        className={selectedMenu === "chart" ? "active" : ""}
      >
        시청자
      </Menu>
      <Menu
        onClick={() => handleMenuClick("view")}
        className={selectedMenu === "view" ? "active" : ""}
      >
        조회수
      </Menu>
      <Menu
        onClick={() => handleMenuClick("play")}
        className={selectedMenu === "play" ? "active" : ""}
      >
        플레이수
      </Menu>
      <Menu
        onClick={() => handleMenuClick("replay")}
        className={selectedMenu === "replay" ? "active" : ""}
      >
        리플레이수
      </Menu>
      <Menu
        onClick={() => handleMenuClick("time")}
        className={selectedMenu === "time" ? "active" : ""}
      >
        플레이 시간
      </Menu>
    </PrimaryNav>
  );
};

export default Nav;
