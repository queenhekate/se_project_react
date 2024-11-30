import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import { setToken, getToken, removeToken } from "../../utils/token";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

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

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((data) => {
        setIsLoggedInLoading(false);
        setIsLoggedIn(true);
        setUserData(data.user);
      })
      .catch(console.error);
    removeToken();
    setIsLoggedInLoading(false);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  function handleAddItemSubmit(item, resetForm) {
    return addItem(item)
      .then((createdItem) => {
        setClothingItems((prevItems) => [createdItem, ...prevItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleRegistration = (name, avatar, email, password) => {
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
          setToken(data.token);
          setIsLoggedIn(true);
          console.log(data.user);
          setCurrentUser(data.user);
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

  function handleConfirmDelete() {
    return deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
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
                path=""
                element={
                  clothingItems.length > 0 && (
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onAddItem={handleAddItemSubmit}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenDelete={handleOpenDelete}
          />
          <ModalWithConfirm
            activeModal={activeModal}
            handleConfirmDelete={handleConfirmDelete}
            onClose={closeActiveModal}
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
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
