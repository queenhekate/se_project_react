import "./ModalWithConfirm.css";

function ModalWithConfirm({ activeModal, onClose, handleConfirmDelete }) {
  return (
    <div className={`modal ${activeModal === "confirm" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__footer">
          <h2 className="modal__caption">
            Are you sure you want to delete this item? This action is
            irreversible.
          </h2>
          <button
            deleteItem={handleConfirmDelete}
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
