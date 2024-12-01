import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants";
import * as api from "../../utils/api.js";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
// import { getItems, addItem, deleteItem } from "../../utils/api.js";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import { setToken, getToken, removeToken } from "../../utils/token.js";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  checkToken,
  login,
  register,
  editProfileData,
} from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: "",
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [currentUser, setUserData] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenDelete = () => {
    setActiveModal("confirm");
  };

  const openRegisterModal = (e) => {
    e.preventDefault();
    setActiveModal("register");
  };

  const openLoginModal = (e) => {
    e.preventDefault();
    setActiveModal("login");
  };

  const openEditProfileModal = () => {
    setActiveModal("edit");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  // useEffect(() => {
  //   const jwt = getToken();
  //   if (!jwt) {
  //     console.error("No token found in local storage");
  //     return;
  //   }

  //   checkToken(jwt)
  //     .then((data) => {
  //       setIsLoggedInLoading(false);
  //       setIsLoggedIn(true);
  //       setUserData(data.user);
  //       localStorage.setItem("jwt", data.token);
  //     })
  //     .catch((error) => {
  //       console.error("Invalid token:", error);
  //       removeToken();
  //       setIsLoggedInLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    getWeather(
      { latitude: coordinates.latitude, longitude: coordinates.longitude },
      APIkey
    )
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function onAddItem(name, imageUrl, weather) {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.err("User not authorized");
      return;
    }
    setIsLoading(true);

    api
      .addItem({ name, imageUrl, weather }, token)
      .then((createdItem) => {
        setClothingItems((prevItems) => [createdItem, ...prevItems]);
        // resetForm();
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleRegistration = (email, password, name, avatar) => {
    register(name, avatar, email, password)
      .then(() => {
        handleLogin(email, password);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }

    login(email, password)
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          console.log(data.user);
          setUserData(data.user);
          setIsLoggedInLoading(false);
        } else {
          console.error("No JWT token found.");
        }
        closeActiveModal();
      })
      .catch((err) => {
        console.err("Error logging user in:", err);
      })
      .finally(setIsLoggedInLoading(false));
  };

  const handleEditProfile = (name, avatar) => {
    const token = localStorage.getItem("jwt");

    if (!currentUser) {
      console.error("User not authorized to modify profile");
      return;
    }

    setIsLoading(true);
    editProfileData(name, avatar, token)
      .then((userData) => {
        const user = userData.user;
        setUserData({
          _id: currentUser._id,
          email: currentUser.email,
          name: user.name,
          avatar: user.avatar,
        });
        closeActiveModal();
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setUserData({});
      closeActiveModal();
    } else {
      console.err("Cannot be logged out");
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  function onDeleteItem(id) {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Not authorized");
      return;
    }
    api
      .deleteItem(id, token)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              openRegisterModal={openRegisterModal}
              openLoginModal={openLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  // clothingItems.length > 0 && (
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                  //  )
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      selectedCard={selectedCard}
                      openEditProfileModal={openEditProfileModal}
                      handleLogOut={handleLogOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            buttonText={isLoading ? "Saving..." : "Add garment"}
          />
          <ItemModal
            name="preview"
            activeModal={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenDelete={handleOpenDelete}
            // onCardLike={handleCardLike}
          />
          <ModalWithConfirm
            name="delete"
            isOpen={activeModal === "delete"}
            activeModal={activeModal}
            onDeleteItem={onDeleteItem}
            onClose={closeActiveModal}
            buttonText={isLoading ? "Saving..." : "Yes, delete item"}
          />
          <RegisterModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "register"}
            handleRegistration={handleRegistration}
            buttonText={isLoading ? "Saving..." : "Sign Up"}
            openSignInModal={openLoginModal}
          />
          <LoginModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            buttonText={isLoading ? "Saving..." : "Log In"}
            openRegisterModal={openRegisterModal}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "edit"}
            handleEdit={handleEditProfile}
            buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
