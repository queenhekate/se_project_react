import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import React, { useContext } from "react";

function ClothesSection({
  handleAddClick,
  handleCardClick,
  clothingItems,
  onCardLike,
  item,
}) {
  // const currentUser = React.useContext(CurrentUserContext);

  // const clothingItemsByOwner = clothingItems.filter(
  //   (item) => item.owner._id === currentUser._id
  // );

  //const isOwn = item.owner === currentUser._id;

  const { currentUser } = useContext(CurrentUserContext);

  const isOwner = currentUser && item.owner === currentUser._id;

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
      {isOwner && (
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
