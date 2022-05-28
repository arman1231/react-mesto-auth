import React from "react";
import closeSvg from "../images/close.svg";

export default function PopupWithForm({name, title, buttonText, children, isOpen, onClose, onSubmit}) {
  function closeOnOverlay(e) {
    if (e.currentTarget === e.target) {onClose()};
  }


  return (
    <div>
      <div className={`modal modal_${name} ${isOpen ? 'modal_opened' : ""}`} onMouseDown={closeOnOverlay}>
        <div className="modal__container">
          <button className="modal__close-btn" type="button" onClick={onClose}>
            <img
              className="modal__close-icon"
              src={closeSvg}
              alt="кнопка закрыть"
            />
          </button>
          <h2 className="modal__heading">{title}</h2>
          <form className="modal__form" name={name} action="#" onSubmit={onSubmit} noValidate>
            {children}
            <fieldset className="modal__handlers">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
          </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
