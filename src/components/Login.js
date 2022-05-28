import React from "react";

export default function Register({ isOpen, onClose, onUpdateUser, isLoading }) {

  return (
    <div className="content page__content">
      <section className="sign page_sign">
      <h1 className="sign__caption">Вход</h1>
      <form className="sign__form"  action="#" noValidate>
      <fieldset className="sign__user-data">
        <input
          className="sign__input"
          id="sign__name"
          type="text"
          name="user-name"
          minLength="2"
          maxLength="40"
          placeholder="Email"
          required
        />
        <span className="sign__input-error user-name-error"></span>
        <input
          className="sign__input"
          id="sign__title"
          type="password"
          name="user-title"
          minLength="2"
          maxLength="200"
          placeholder="Пароль"
          required
        />
        <span className="sign__input-error user-title-error"></span>
      </fieldset>
            <fieldset className="sign__handlers">
            <button className="sign__submit" type="submit">
            Войти
            </button>
          </fieldset>
          </form>
          {/* <span className="sign__sign-question">Уже зарегистрированы? Войти</span> */}
      </section>

    </div>
  );
}
