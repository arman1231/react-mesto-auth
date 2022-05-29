import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as userAuth from "../utils/userAuth";
import InfoTooltip from "./InfoTooltip";

import resOk from "../images/resOk.svg"
import resErr from "../images/resErr.svg"


export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = React.useState(false);
  const [isErrorTooltipOpen, setIsErrorTooltipOpen] = React.useState(false)


  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    userAuth.register(email, password).then((res) => {
      console.log(res);
      if (res) {
        setIsSuccessTooltipOpen(true)
        
      } else {
        setIsErrorTooltipOpen(true)
        console.log("Что-то пошло не так!");
      }
    });
  }
  function handleOnClose() {
    history.push("/sign-in");
  }
  return (
    <>
      <div className="content page__content">
        <section className="sign page_sign">
          <h1 className="sign__caption">Регистрация</h1>
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
                Зарегистрироваться
              </button>
            </fieldset>
          </form>
          <span className="sign__sign-question">
            Уже зарегистрированы?{" "}
            <Link className="sign__link" to="/sign-in">
              Войти
            </Link>
          </span>
        </section>
      </div>
      <InfoTooltip isOpen={isSuccessTooltipOpen} src={resOk} title={'Вы успешно зарегистрировались!'} onClose={handleOnClose}/>
      <InfoTooltip isOpen={isErrorTooltipOpen} src={resErr} title={'Что-то пошло не так! Попробуйте ещё раз.'} onClose={() => setIsErrorTooltipOpen(false)}/>
    </>
  );
}
