import React from 'react'
import closeSvg from "../images/close.svg";

export default function InfoTooltip({title, src, isOpen, onClose}) {
    function handleClick() {
        onClose();
    }
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ""}`}>
      <div className="modal__container">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeSvg}
            alt="кнопка закрыть"
            onClick={handleClick}
          />
        </button>
        <img className='modal__tooltip-img' src={src} alt={title} />
        <h2 className="modal__tooltip-heading">{title}</h2>
      </div>
    </div>
  )
}
