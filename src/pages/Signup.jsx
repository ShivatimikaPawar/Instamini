import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instagramAPI from "../api/instagramAPI";
import Lottie from "lottie-react";
import signupAnimation from "../assets/Welcome.json"; // you can change animation
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await instagramAPI.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        {/* FORM */}
        <div className="signup-form">
          <h2>Create Account</h2>
          <p className="subtitle">Sign up to get started</p>

          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          {/* LOGIN LINK */}
          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>

        {/* LOTTIE – DESKTOP ONLY */}
        <div className="signup-animation">
          <Lottie animationData={signupAnimation} loop className="lottie" />
        </div>

      </div>
    </div>
  );
}

