import React from 'react'
import logo from "../images/logo.svg";
import { Link, useLocation } from 'react-router-dom';

export default function Header({loggedIn, userEmail}) {
  const location = useLocation();

  function definePath() {
    let path = '';
    switch (location.pathname) {
      case('/crash-test'):
        path = '/crash-test';
        return path;
      case ('/sign-in'):
        path = '/sign-up';
        return path;
      case ('/sign-up'):
        path = '/sign-in';
        return path;
      default: 
      path = '/sign-in';
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
  function signOut() {
    localStorage.removeItem('jwt')
  }
  return (
    <header className="header page__header">
    <img
      className="header__logo"
      src={logo}
      alt="Логотип вебсайта Место"
    />
    <div className='header__handles'>
      <span className='header__email'>{location.pathname !== '/' ? '' : userEmail}</span>
      <Link onClick={loggedIn ? signOut : null} className='header__button header__button_logged-out' to={definePath}>{defineLinkName()}</Link>
    </div>
  </header>
  )
}
