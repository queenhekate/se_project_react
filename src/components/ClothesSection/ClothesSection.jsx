import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothesSection">
      <div className="clothesSection__container">
        <p className="clothesSection__label">Your Items</p>
        <button className="clothesSection__button">+ Add New </button>
      </div>
      <ul className="clothesSection__cards">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
