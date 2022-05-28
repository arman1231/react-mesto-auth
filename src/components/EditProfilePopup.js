import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__user-data">
        <input
          className="modal__input"
          id="modal__name"
          type="text"
          name="user-name"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span className="modal__input-error user-name-error"></span>
        <input
          className="modal__input"
          id="modal__title"
          type="text"
          name="user-title"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeAbout}
          required
        />
        <span className="modal__input-error user-title-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
