import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function AddItemModal({
  activeModal,
  onClose,
  isOpen,
  onSubmit,
  onAddItem,
  buttonText,
}) {
  const { values, resetForm, errors } = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // const resetForm = () => {
  //   setName("");
  //   setUrl("");
  //   setWeather("");
  // };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values.name, values.imageUrl, values.weather);
    onSubmit(newItem, resetForm);
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="clothes"
      buttonText={buttonText}
      activeModal={activeModal}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          minLength={2}
          value={name}
          onChange={handleNameChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          placeholder="Image URL"
          minLength="1"
          value={values.imageUrl}
          onChange={handleUrlChange}
          required
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
            checked={values.weather === "hot"}
            required
          />
          <span>&nbsp;Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={values.weather === "warm"}
            required
          />
          <span>&nbsp;Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={values.weather === "cold"}
            required
          />
          <span>&nbsp;Cold</span>
        </label>
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
