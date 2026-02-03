import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // ❌ Not logged in
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      // ✅ Normal user route (no role required)
      if (!role) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      // ✅ Admin route → check admins collection
      try {
        const adminRef = doc(db, "admins", user.email);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists() && adminSnap.data().role === "admin") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error("Admin check error:", err);
        setAuthorized(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }

  // ❌ Not authorized
  if (!authorized) {
    // admin route → go to admin login
    if (role === "admin") {
      return <Navigate to="/admin-login" />;
    }
    // user route → go to login
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
