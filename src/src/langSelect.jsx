import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "./context/langContext";

import englandImg from "/icons/england.png";
import vietnamImg from "/icons/vietnam.png";

const LanguageSelector = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <div
      style={{
        backgroundColor: "#15151e",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <span
        onClick={toggleLanguage}
        style={{ cursor: "pointer", marginRight: "10px" }}
      >
        {language === "en" ? (
          <img src={englandImg} alt="English Flag" />
        ) : (
          <img src={vietnamImg} alt="Vietnamese Flag" />
        )}
      </span>
    </div>
  );
};

export default LanguageSelector;
