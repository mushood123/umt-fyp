import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import logo from "../Assets/quickFix_logo.jpg";
import "./login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch Firestore document
      const userRef = doc(db, "admins", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError("Access denied. You are not authorized.");
        await signOut(auth);
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("User not found.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="outer-container">
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="inner-container">
        <div className="login-page">
          <div className="left-side">
            <img src={logo} alt="login" />
          </div>
          <div className="right-side">
            <div className="login-form">
              <h2>Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  className="login-btn"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                {error && <p className="error-message">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
