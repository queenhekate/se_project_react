import "./ItemCard.css";
import liked_btn from "../../images/liked_btn.svg";
import unliked_btn from "../../images/unliked_btn.svg";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { useContext } from "react";

function ItemCard({ item, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = !currentUser._id
    ? "card__like-hidden"
    : "card__like-visible";

  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
        <img
          src={isLiked ? liked_btn : unliked_btn}
          alt={isLiked ? "Liked" : "Not liked"}
          className={itemLikeButtonClassName}
          onClick={handleLike}
        />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
