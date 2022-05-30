import React from "react";
import { useHistory } from "react-router-dom";
import * as userAuth from "../utils/userAuth";

export default function Login({ handleLoginSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleLoginSubmit(email, password);
    setEmail("");
    setPassword("");
    // userAuth.authorize(email, password).then((data) => {
    //   if (data.token) {
    //     setEmail('');
    //     setPassword('');
    //     handleLogin(e);
    //     history.push('/');
    //   }
    // }).catch(err => console.log(err))
  }

  return (
    <div className="content page__content">
      <section className="sign page_sign">
        <h1 className="sign__caption">Вход</h1>
        <form
          className="sign__form"
          action="#"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="sign__user-data">
            <input
              className="sign__input"
              id="sign__email"
              type="text"
              name="email"
              minLength="2"
              maxLength="40"
              placeholder="Email"
              value={email || ""}
              onChange={handleChangeEmail}
              required
            />
            <span className="sign__input-error user-name-error"></span>
            <input
              className="sign__input"
              id="sign__title"
              type="password"
              name="user-password"
              minLength="2"
              maxLength="200"
              placeholder="Пароль"
              value={password || ""}
              onChange={handleChangePassword}
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
      </section>
    </div>
  );
}
