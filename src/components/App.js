import React from "react";
import {
  Route,
  Switch,
  useParams,
  useHistory,
  Redirect,
} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCard from "./ConfirmDeleteCard";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as userAuth from "../utils/userAuth";
import InfoTooltip from "./InfoTooltip";
import resOk from "../images/resOk.svg";
import resErr from "../images/resErr.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmDeleteCardOpen, setIsConfirmDeleteCardOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");


  const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = React.useState(false);
  const [isErrorTooltipOpen, setIsErrorTooltipOpen] = React.useState(false);
  function handleOnTooltipClose() {
    setIsSuccessTooltipOpen(false);
    history.push("/sign-in");
  }


  const history = useHistory();

  function handleRegisterSubmit(email, password) {
    userAuth.register(email, password).then((res) => {
      if (res) {
        setIsSuccessTooltipOpen(true)

      } else {
        setIsErrorTooltipOpen(true)
        console.log("Что-то пошло не так!");
      }
    }).catch(err => console.log(err))
  }
  function handleLoginSubmit(email, password) {
    userAuth.authorize(email, password).then((data) => {
      if (data.token) {
        api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((error) => console.log(error));

        api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
        checkToken();
        setLoggedIn(true);
        history.push('/');
      }
    }).catch(err => console.log(err));
  }
  React.useEffect(() => {
      if (localStorage.getItem('jwt')) {
        api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((error) => console.log(error));

        api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
        checkToken();
        setLoggedIn(true);
        history.push('/');
      }
  }, [])

  function handleEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }
  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        userAuth.getContent(jwt).then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        });
      }
    }
  }
  React.useEffect(() => {
    if (
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isImagePopupOpen
    ) {
      document.addEventListener("keydown", handleEscClose);
    }
  }, [
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isImagePopupOpen,
  ]);
  // React.useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((res) => {
  //       setCards(res);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);
  // React.useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((res) => {
  //       setCurrentUser(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    setIsConfirmDeleteCardOpen(true);
    setCard(card);
  }
  function handleConfirmDeleteCardSubmit() {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((newCardList) => {
        //После запроса в API, обновите стейт cards с помощью метода filter: создайте копию массива, исключив из него удалённую карточку.
        setCards((cardList) =>
          cardList.filter((c) => {
            return c._id !== card._id;
          })
        );
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeleteCardOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    document.removeEventListener("keydown", handleEscClose);
  }
  function handleUpdateUser({ name, about: description }) {
    setIsLoading(true);
    api
      .setUserInfo({
        name,
        about: description,
      })
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }
  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api
      .updateAvatar(link)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }
  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  return (
    <div className="wrap">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} userEmail={userEmail} />
          <Switch>
            <Route path="/sign-in">
              <Login handleLoginSubmit={handleLoginSubmit} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegisterSubmit={handleRegisterSubmit} />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          </Switch>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmDeleteCard
            isOpen={isConfirmDeleteCardOpen}
            onClose={closeAllPopups}
            onConfirmDeleteCard={handleConfirmDeleteCardSubmit}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isSuccessTooltipOpen}
            src={resOk}
            title={"Вы успешно зарегистрировались!"}
            onClose={handleOnTooltipClose}
          />
          <InfoTooltip
            isOpen={isErrorTooltipOpen}
            src={resErr}
            title={"Что-то пошло не так! Попробуйте ещё раз."}
            onClose={() => setIsErrorTooltipOpen(false)}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
