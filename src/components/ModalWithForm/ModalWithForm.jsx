import "./ModalWithForm.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function ModalWithForm({
  children,
  name,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      onClose();
    }
  }

  const { isValid } = useFormWithValidation({});

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit" disabled={isValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
