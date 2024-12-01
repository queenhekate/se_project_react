import "./Sidebar.css";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { useContext } from "react";

function Sidebar({ openEditProfileModal, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const getInitial = (name) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "?";
  };

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="Profile avatar"
          />
        ) : (
          <div className="sidebar__placeholder">
            {getInitial(currentUser.name)}
          </div>
        )}
        <p className="sidebar__username">User Name</p>
      </div>
      <div className="sidebar_buttons">
        <button
          className="sidebar__edit"
          type="button"
          onClick={openEditProfileModal}
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__logout"
          type="button"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
