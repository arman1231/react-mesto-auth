import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(name, link);
        setName('');
        setLink('');
    }

  return (
    <PopupWithForm
      name="add-new-place"
      title="Новое место"
      buttonText={isLoading ? "Добавление..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__user-data">
        <input
          className="modal__input"
          id="modal__place-name"
          type="text"
          name="place-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name || ''}
          onChange={handleChangeName}
          required
        />
        <span className="modal__input-error place-name-error"></span>
        <input
          className="modal__input"
          id="modal__place-img-link"
          type="url"
          name="place-img-link"
          placeholder="Ссылка на картинку"
          value={link || ''}
          onChange={handleChangeLink}
          required
        />
        <span className="modal__input-error place-img-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
