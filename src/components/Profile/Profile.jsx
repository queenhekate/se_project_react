import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
  selectedCard,
  openEditProfileModal,
  handleLogOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          openEditProfileModal={openEditProfileModal}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothing-section">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          selectedCard={selectedCard}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
