import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const avatarInput = React.useRef('');
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarInput.current.value
          );
        avatarInput.current.value = '';
    }

  return (
    <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
          >
            <fieldset className="modal__user-data">
              <input
                className="modal__input"
                id="modal__avatar"
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                ref={avatarInput}
                required
              />
              <span className="modal__input-error avatar-error"></span>
            </fieldset>
          </PopupWithForm>
  )
}
