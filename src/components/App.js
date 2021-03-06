import React from "react";
import {
  Route,
  Switch,
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
  const history = useHistory();
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
  const [stateSuccess, setStateSuccess] = React.useState(null)
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false)

  function handleOnTooltipClose() {
    setIsTooltipOpen(false);
    history.push("/sign-in");
  }
  function handleRegisterSubmit(email, password) {
    userAuth.register(email, password).then((res) => {
      if (res) {
        setIsTooltipOpen(true)
        setStateSuccess(true)
      } else {
        setIsTooltipOpen(true)
        setStateSuccess(false)
        console.log("??????-???? ?????????? ???? ??????!");
      }
    }).catch(err => console.log(err))
  }
  function handleLoginSubmit(email, password) {
    userAuth.authorize(email, password).then((data) => {
      if (!data) {
        setIsTooltipOpen(true)
        setStateSuccess(false)
        console.log("??????-???? ?????????? ???? ??????!");
      }
      if (data.token) {
        setUserEmail(email);
        setLoggedIn(true);
        history.push('/');
      } 
    }).catch(err => console.log(err));
  }
  React.useEffect(() => {
      checkToken();
  }, [])
  React.useEffect(() => {
      if (loggedIn) {
        setIsLoading(true);
        api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false)
        });

        api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
  }, [loggedIn])

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
            setUserEmail(res.email);
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
  function handleCardLike(card) {
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
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
        //?????????? ?????????????? ?? API, ???????????????? ?????????? cards ?? ?????????????? ???????????? filter: ???????????????? ?????????? ??????????????, ???????????????? ???? ???????? ?????????????????? ????????????????.
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
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api
      .updateAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="wrap">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} userEmail={userEmail} />
          <Switch>
            <Route path="/crash-test">
              <span>SERVER WILL FALL NOW</span>
            </Route>
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
              isLoading={isLoading}
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
            isOpen={isTooltipOpen}
            src={stateSuccess ? resOk : resErr}
            title={stateSuccess ? "???? ?????????????? ????????????????????????????????????!" : "??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????."}
            onClose={stateSuccess ? handleOnTooltipClose : () => setIsTooltipOpen(false)}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
export default App;
