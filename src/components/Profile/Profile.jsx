import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleAddClick, handleCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothing-section">
        <ClothesSection
          onClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
