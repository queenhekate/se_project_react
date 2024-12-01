import "./ItemModal.css";
import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function ItemModal({ activeModal, card, onClose, name, onOpenDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // check item owner is current user
  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__open-delete ${
    isOwn ? "modal__open-delete_visible" : "modal__open-delete_hidden"
  }`;
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      onClose();
    }
  }

  // function ItemModal({ activeModal, onClose, card, onOpenDelete }) {
  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_opened"}`}
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
          <button
            className={itemDeleteButtonClassName}
            onClick={onOpenDelete}
            type="button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
