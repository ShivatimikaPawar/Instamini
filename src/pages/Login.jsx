import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import instagramAPI from "../api/instagramAPI.js";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Welcome.json";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instagramAPI.post("/auth/login", {
        email,
        password,
      });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* FORM */}
        <div className="login-form">
          <h2>Welcome Back!</h2>
          <p className="subtitle">Login to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p className="forgot">Forgot password?</p>

          {/* SIGNUP LINK */}
          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>

        {/* LOTTIE (DESKTOP ONLY) */}
        <div className="login-animation">
          <Lottie animationData={loginAnimation} loop className="lottie" />
        </div>

      </div>
    </div>
  );
}







