import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import logo from "../assets/logo.png";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const loadUser = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({
            name: user.displayName || "",
            email: user.email
          });
        }
      } catch (err) {
        console.log("Profile load error:", err);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  const displayName =
    userData.name ||
    (userData.email ? userData.email.split("@")[0] : "User");

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="profile-container">
      <div className="premium-profile">

        <img src={logo} alt="CRAFTIX Global" className="profile-logo" />

        <span className="profile-badge">USER</span>

        <div className="profile-avatar">
          {avatarLetter}
        </div>

        <h2 className="profile-name">{displayName}</h2>
        <p className="profile-sub">Welcome back 👋</p>

        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{userData.email}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;
