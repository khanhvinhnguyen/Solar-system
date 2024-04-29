import React, { useContext, useEffect, useState } from "react";
import intl from "react-intl-universal";

import { SettingContext } from "../context/SettingContext";

import englandImg from "/icons/england.png";
import vietnamImg from "/icons/vietnam.png";

const LanguageSelector = () => {
  const { language, toggleLanguage } = useContext(SettingContext);

  const handleToggleLanguage = () => {
    toggleLanguage();
  };

  return (
    <div
      style={{
        backgroundColor: "#15151e",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <span
        onClick={handleToggleLanguage}
        style={{ cursor: "pointer", marginRight: "10px" }}
      >
        {language === "en" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={englandImg} alt="English Flag" />
            {intl.get("language.english")}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={vietnamImg} alt="Vietnamese Flag" />
            {intl.get("language.vietnamese")}
          </div>
        )}
      </span>
    </div>
  );
};

export default LanguageSelector;
