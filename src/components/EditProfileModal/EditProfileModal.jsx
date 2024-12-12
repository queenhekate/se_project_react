import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import "./EditProfileModal.css";

function EditProfileModal({
  activeModal,
  onClose,
  isOpen,
  handleEditProfile,
  buttonText,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, setValues, resetForm, handleChange, errors } =
    useFormWithValidation();

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name,
        avatarUrl: currentUser.avatar,
      });
    }
  }, [isOpen, setValues, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values.name, values.avatarUrl);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit"
      activeModal={activeModal}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <label className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          minLength="2"
          value={values.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
          required
        />
        {errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
