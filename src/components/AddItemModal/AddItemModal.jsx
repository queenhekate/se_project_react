import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  const [type, setType] = useState("");
  const handleTypeChange = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, type });
  };
  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      // activeModal={activeModal}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Name{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          minLength="1"
          maxLength="30"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="radAnswer"
            className="modal__radio-input"
            value="hot"
            onChange={handleTypeChange}
          />
          &nbsp;Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="radAnswer"
            className="modal__radio-input"
            value="warm"
            onChange={handleTypeChange}
          />
          &nbsp;Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="radAnswer"
            className="modal__radio-input"
            value="cold"
            onChange={handleTypeChange}
          />
          &nbsp;Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
