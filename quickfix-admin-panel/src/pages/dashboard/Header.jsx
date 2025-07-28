import { MdEmail, MdLogout, MdPerson } from "react-icons/md";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import "./header.css";

export default function Header() {
  const userEmail = auth?.currentUser?.email;
  const [display, setDisplay] = useState("none");

  const logout = () => {
    signOut(auth);
  };

  const showProfileTab = () => {
    setDisplay("block");
  };

  const hideProfileTab = () => {
    setDisplay("none");
  };

  return (
    <>
      <div className="topnav-container">
        <h2>QuickFix Dashboard</h2>
        <div
          className="profile-icon"
          onMouseOver={showProfileTab}
          onMouseOut={hideProfileTab}
        >
          <MdPerson size={25} color="black" />
        </div>
        <div
          className="profile-tab"
          style={{ display: display }}
          onMouseOver={showProfileTab}
          onMouseOut={hideProfileTab}
        >
          <div className="profile-tab-item">
            <MdEmail color="black" />
            {userEmail}
          </div>
          <button className="profile-tab-item logout-btn" onClick={logout}>
            <MdLogout color="black" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
