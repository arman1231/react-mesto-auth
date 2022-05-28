import React from 'react'
import closeSvg from "../images/close.svg";
import resOk from "../images/resOk.svg"
import resErr from "../images/resErr.svg"

export default function InfoTooltip({title, src, isOpen, onClose}) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ""}`}>
      <div className="modal__container">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeSvg}
            alt="кнопка закрыть"
          />
        </button>
        <img src={src} alt={title} />
        <h2 className="modal__heading">{title}</h2>
      </div>
    </div>
  )
}
