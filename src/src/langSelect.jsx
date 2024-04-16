import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "./context/langContext";

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
          <img src="/icons/england.png" alt="English Flag" />
        ) : (
          <img src="/icons/vietnam.png" alt="Vietnamese Flag" />
        )}
      </span>
    </div>
  );
};

export default LanguageSelector;
