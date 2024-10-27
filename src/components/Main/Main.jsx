import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/constants";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const getWeatherType = useMemo(() => {
    const temp = weatherData?.temperature?.[currentTemperatureUnit] || 999;
    if (weatherData >= 86) {
      return "hot";
    } else if (weatherData >= 66) {
      return "warm";
    } else {
      return "cold";
    }
  }, [weatherData]);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg;F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
