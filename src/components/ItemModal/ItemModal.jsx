import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function ItemModal({ isOpen, card, onClose, name, onOpenDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button modal__delete-button_visible ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      onClose();
    }
  }

  // function ItemModal({ activeModal, onClose, card, onOpenDelete }) {
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlayClick}
      name={name}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className={itemDeleteButtonClassName}
              onClick={onOpenDelete}
              type="button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
