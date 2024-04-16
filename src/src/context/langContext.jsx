import React, { createContext, useState, useEffect } from "react";
import intl from "react-intl-universal";

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    loadLocale(language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "vn" : "en"));
  };

  const loadLocale = async (locale) => {
    let localeData;

    if (locale === "en") {
      localeData = await import("../locales/en_US.ts");
    } else if (locale === "vn") {
      localeData = await import("../locales/vi_VN.ts");
    }

    intl.init({
      currentLocale: locale,
      locales: {
        [locale]: localeData.default,
      },
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
