import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants.js";
import * as api from "../../utils/api.js";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  getCurrentUser,
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
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    name: "",
    avatar: "",
  });

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (item) => {
    console.log("this is my item" + item);
    setActiveModal("preview");
    setSelectedCard(item);
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

  const JWT_SECRET = "jwt";
  // with localStorage the key TOKEN_KEY.
  const setToken = (token) => localStorage.setItem(JWT_SECRET, token);
  // getToken retrieves and returns the value associated with TOKEN_KEY from localStorage.
  const getToken = () => {
    return localStorage.getItem(JWT_SECRET);
  };

  const removeToken = () => {
    return localStorage.removeItem(JWT_SECRET);
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      console.error("No token found in local storage");
      return;
    }

    getCurrentUser(jwt)
      .then((data) => {
        setIsLoggedInLoading(false);
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error("Invalid token:", error);
        removeToken();
        setIsLoggedInLoading(false);
      });
  }, []);

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
        console.log(data);
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
    const token = getToken();
    if (!token) {
      console.err("User not authorized");
      return;
    }
    setIsLoading(true);

    api
      .addItem({ name, imageUrl, weather }, token)
      .then((createdItem) => {
        setClothingItems((prevItems) => [createdItem.data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleRegistration = (email, password, name, avatar) => {
    register(email, password, name, avatar)
      .then(() => {
        handleLogin(email, password);
        closeActiveModal();
      })
      .catch(console.error);
  };

  function getUserData(token) {
    // use the token from the local storage
    getCurrentUser(token)
      // fetch the data from the api
      .then((userData) => {
        // set the currentUser in this function, not on the login function
        setCurrentUser({
          _id: userData._id,
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }
    login(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          getUserData(data.token);
        } else {
          console.error("No JWT token found.");
        }
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error logging user in:", err);
      })
      .finally(() => {
        setIsLoggedInLoading(false);
      });
  };

  const handleEditProfile = (name, avatar) => {
    const token = getToken();

    if (!currentUser) {
      console.error("User not authorized to modify profile");
      return;
    }
    setIsLoading(true);
    editProfileData(name, avatar, token)
      .then((userData) => {
        setCurrentUser({
          _id: userData._id,
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar,
        });
        closeActiveModal();
      })
      .catch((err) => console.error("Error updating profile:", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      removeToken();
      setIsLoggedIn(false);
      setCurrentUser({});
      closeActiveModal();
    } else {
      console.err("Cannot be logged out");
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  function onDeleteItem() {
    const token = getToken();
    if (!token) {
      console.error("Not authorized");
      return;
    }
    api
      .deleteItem(selectedCard._id, token)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        closeActiveModal();
        setClothingItems(updatedClothingItems);
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
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
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
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenDelete={handleOpenDelete}
            clothingItems={clothingItems}
            onCardLike={handleCardLike}
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
            openLoginModal={openLoginModal}
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
            handleEditProfile={handleEditProfile}
            buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
