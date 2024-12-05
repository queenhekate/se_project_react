import "./ModalWithConfirm.css";

function ModalWithConfirm({ activeModal, onClose, onDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "confirm" && "modal_opened"}`}>
      <div className="modal__content modal__content-type-confirm">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-confirm"
        ></button>
        <div className="modal__footer-confirm">
          <h2 className="modal__caption-confirm">
            Are you sure you want to delete this item? This action is
            irreversible.
          </h2>
          <button
            onClick={onDeleteItem}
            type="button"
            className="modal__confirm"
          >
            Yes, delete item
          </button>
          <button onClick={onClose} type="button" className="modal__cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWithConfirm;
