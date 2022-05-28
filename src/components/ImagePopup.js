import React from "react";
import closeSvg from "../images/close.svg";

export default function ImagePopup({ card, onClose }) {
  function closeOnOverlay(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <div
      className={`modal image-modal ${card && "modal_opened"}`}
      onMouseDown={closeOnOverlay}
    >
      <div className="image-modal__wrapper">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeSvg}
            alt="кнопка закрыть"
          />
        </button>
        <img
          className="image-modal__img"
          src={card ? card.link : `#`}
          alt={card?.name}
        />
        <p className="image-modal__caption">{card?.name}</p>
      </div>
    </div>
  );
}
