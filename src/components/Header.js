import React from 'react'
import logo from "../images/logo.svg";
import { Link, useLocation } from 'react-router-dom';

export default function Header({loggedIn}) {
  const location = useLocation();
  function definePath() {
    let path = '';
    switch (location.pathname) {
      case ('/sign-in'):
        path = '/sign-up'
        return path;
      case ('/sign-up'):
        path = '/sign-in'
        return path;
      default: 
      path = '/'
      return path;
    }
  }
  function defineLinkName() {
    let linkName = '';
    switch (location.pathname) {
      case ('/sign-in'):
        linkName = 'Регистрация'
        return linkName;
      case ('/sign-up'):
        linkName = 'Войти'
        return linkName;
      default: 
      linkName = 'Выйти'
      return linkName;
    }
  }
  return (
    <header className="header page__header">
    <img
      className="header__logo"
      src={logo}
      alt="Логотип вебсайта Место"
    />
    <div className='header__handles'>
      <span className='header__email'>{`email@mail.com`}</span>
      <Link className='header__button header__button_logged-out' to={definePath}>{defineLinkName()}</Link>
    </div>
  </header>
  )
}
