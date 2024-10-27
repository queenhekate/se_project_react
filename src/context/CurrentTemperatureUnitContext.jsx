import React from "react";

const CurrentTemperatureContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnit };
