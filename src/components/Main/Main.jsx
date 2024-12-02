import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/constants";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  defaultClothingItems,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoggedIn = currentUser && currentUser.name;
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  // const getWeatherType = useMemo(() => {
  //   if (weatherData[currentTemperatureUnit] >= 86) {
  //     return "hot";
  //   } else if (weatherData[currentTemperatureUnit] >= 66) {
  //     return "warm";
  //   } else {
  //     return "cold";
  //   }
  // }, [weatherData]);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData?.temp[currentTemperatureUnit]} / You may want to
          wear:
        </p>
        <div>
          {isLoggedIn ? (
            <ul className="cards__list">
              {clothingItems
                .filter((item) => {
                  return item.weather === weatherData.type;
                })
                .map((item) => {
                  return (
                    <ItemCard
                      key={item._id}
                      item={item}
                      onClick={handleCardClick}
                      onCardLike={onCardLike}
                    />
                  );
                })}
            </ul>
          ) : (
            <ul className="cards__guest-list">
              {clothingItems
                .filter((defaultClothingItems) => {
                  return defaultClothingItems.weather === weatherData.type;
                })
                .map((defaultClothingItems) => {
                  return (
                    <ItemCard
                      key={defaultClothingItems._id}
                      item={defaultClothingItems}
                      onClick={handleCardClick}
                      onCardLike={onCardLike}
                    />
                  );
                })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default Main;
