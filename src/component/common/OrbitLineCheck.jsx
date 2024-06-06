import React, { useContext, useEffect, useState } from "react";
import intl from "react-intl-universal";
import { Checkbox } from "antd";

import { SettingContext } from "@/component/context/SettingContext";

const OrbitLineSelector = () => {
  const { toggleOrbitLine } = useContext(SettingContext);

  const handleToggleOrbitLine = (e) => {
    toggleOrbitLine();
  };

  return (
    <Checkbox onChange={handleToggleOrbitLine}>
      {intl.get(`settings.orbitLine`)}
    </Checkbox>
  );
};

export default OrbitLineSelector;
