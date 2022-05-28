import React from 'react'
import logo from "../images/logo.svg";

export default function Header({loggedIn}) {
  return (
    <header className="header page__header">
    <img
      className="header__logo"
      src={logo}
      alt="Логотип вебсайта Место"
    />
    <div className='header__handles'>
      <span className='header__email'>arman.che@ya.ru</span>
      <button className='header__button header__button_logged-out'>{loggedIn ? `Выход` : `Вход`}</button>
    </div>
  </header>
  )
}
