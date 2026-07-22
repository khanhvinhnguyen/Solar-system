import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import intl from "react-intl-universal";

export const SettingContext = createContext({
  language: "en",
  toggleLanguage: () => {},
  orbitLineState: false,
  toggleOrbitLine: () => {},
  planetSpeed: 1,
  handleSpeedPlanet: () => {},
});

export const SettingProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [orbitLineState, setOrbitLineState] = useState(true);
  const [planetSpeed, setPlanetSpeed] = useState(1);

  useEffect(() => {
    loadLocale(language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "vn" : "en"));
  }, []);

  const toggleOrbitLine = useCallback(() => {
    setOrbitLineState((prevOrbitLineState) => !prevOrbitLineState);
  }, []);

  const handleSpeedPlanet = useCallback((value) => {
    setPlanetSpeed(value);
  }, []);

  const loadLocale = async (locale) => {
    let localeData;

    if (locale === "en") {
      localeData = await import("@/locales/en_US.js");
    } else if (locale === "vn") {
      localeData = await import("@/locales/vi_VN.js");
    }

    intl.init({
      currentLocale: locale,
      locales: {
        [locale]: localeData.default,
      },
    });
  };

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
      orbitLineState,
      toggleOrbitLine,
      planetSpeed,
      handleSpeedPlanet,
    }),
    [
      language,
      toggleLanguage,
      orbitLineState,
      toggleOrbitLine,
      planetSpeed,
      handleSpeedPlanet,
    ]
  );

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};
