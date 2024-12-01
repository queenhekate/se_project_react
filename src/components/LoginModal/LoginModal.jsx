import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import "./LoginModal.css";

function LoginModal({
  activeModal,
  onClose,
  isOpen,
  handleLogin,
  buttonText,
  openRegisterModal,
}) {
  const { values, handleChange, errors } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      activeModal={activeModal}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <label className="modal__label">
        Email *{" "}
        <input
          type="text"
          className="modal__input"
          name="email"
          placeholder="Email"
          minLength={2}
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password *{" "}
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <button
        type="button"
        className="modal__btn-register"
        onClick={openRegisterModal}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
