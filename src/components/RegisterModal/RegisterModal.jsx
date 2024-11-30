import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function RegisterModal({
  activeModal,
  onClose,
  isOpen,
  handleRegistration,
  buttonText,
  openLoginModal,
}) {
  const { values, handleChange, resetForm, errors } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(
      values.email,
      values.password,
      values.name,
      values.avatarUrl
    );
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="signup"
      activeModal={activeModal}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <label className="modal__label">
        Email *{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          minLength={2}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password *{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          minLength="1"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          name="avatarUrl"
          id="avatarURL"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
        />
        {errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
      </label>
      <button
        type="button"
        className="modal__btn-login"
        onClick={openLoginModal}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
