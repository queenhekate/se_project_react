import avatar from "../../images/avatar.png";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default Sidebar;
