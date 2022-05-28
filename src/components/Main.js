import React from "react";
import pencilSvg from "../images/pencil.svg";
import crossSvg from "../images/cross.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__general">
          <button
            className="profile__edit-user-image-button"
            type="button"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></button>
          <div className="profile__credentials">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-btn"
                type="button"
                onClick={onEditProfile}
              >
                <img
                  className="profile__edit-icon"
                  src={pencilSvg}
                  alt="Редактировать профиль"
                />
              </button>
            </div>
            <p className="profile__title">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-icon"
            src={crossSvg}
            alt="Добавить фото"
          />
        </button>
      </section>
      <section className="gallery page__gallery">
        {cards.map((card) => {
          return (
            <Card card={card} onCardLike={onCardLike} onCardDelete={onCardDelete} onCardClick={onCardClick} key={card._id}/>
          );
        })}
      </section>
    </main>
  );
}
