import React from 'react'
import trashbinSvg from "../images/trashbin.svg";
import heartSvg from "../images/heart.svg";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `gallery__delete-button ${isOwn ? 'gallery__delete-button_visible' : 'gallery__delete-button_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `gallery__button ${isLiked ? 'gallery__button_active' : '' }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card)
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="gallery__item">
    <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
      <img
        className="gallery__delete-icon"
        src={trashbinSvg}
        alt="Удалить карточку"
      />
    </button>
    <img className="gallery__image" src={card.link} alt={card.name} onClick={handleClick} />
    <div className="gallery__info">
      <p className="gallery__image-title">{card.name}</p>
      <div className="gallery__like-section">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
          <img className="gallery__icon" src={heartSvg} alt="Лайк" />
        </button>
        <span className="gallery__like-counter">{card.likes.length}</span>
      </div>
    </div>
  </div>
  )
}
