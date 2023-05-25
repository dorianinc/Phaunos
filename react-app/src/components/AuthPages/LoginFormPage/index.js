import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log("data 👉👉👉", data);
      setErrors(data);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-page-container">
      <img
        className="login-page-image"
        alt="city-forest"
        src="/images/backgrounds/log-in-page.jpg"
      />
      <div className="login-page-content">
        <h1 id="login-page-header">Log in and start exploring.</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <label>
              Email
              <input
                className={`auth-input ${errors.email && "input-error"}`}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errors">{errors.email}</p>
            </label>
            <label>
              Password
              <input
                className={`auth-input ${errors.password && "input-error"}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errors">{errors.password}</p>
            </label>
          </div>
          <div className="buttons">
            <button className="green-button login" type="submit">
              Log In
            </button>
            <button className="green-button demo" onClick={(e) => handleClick(e)}>
              demo user
            </button>
          </div>
          <p className="signup-option">
            Don't have an account?
            <Link to="/signup"> Sign up here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
