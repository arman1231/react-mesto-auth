import React from 'react'
import PopupWithForm from './PopupWithForm';

export default function ConfirmDeleteCard({isOpen, onClose, onConfirmDeleteCard, isLoading}) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDeleteCard();
  }

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name="confirm-delete"
    title="Вы уверены?"
    buttonText={isLoading ? "Удаление..." : "Да"}
  ></PopupWithForm>
  )
}
