import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function ClothesSection({
  handleAddClick,
  handleCardClick,
  clothingItems,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = clothingItems.owner === currentUser._id;

  return (
    <div className="clothesSection">
      <div className="clothesSection__container">
        <p className="clothesSection__label">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothesSection__button"
        >
          + Add New{" "}
        </button>
      </div>
      {isOwn && (
        <ul className="clothesSection__cards">
          {clothingItems.map((item) => {
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
      )}
    </div>
  );
}

export default ClothesSection;
