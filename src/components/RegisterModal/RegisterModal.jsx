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
  const { values, handleChange, errors } = useFormWithValidation();

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
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          minLength="2"
          autoComplete="email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password *{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          minLength="1"
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
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
