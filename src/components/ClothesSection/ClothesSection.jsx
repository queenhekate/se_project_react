import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleAddClick, handleCardClick, clothingItems }) {
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
      <ul className="clothesSection__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onClick={handleCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
