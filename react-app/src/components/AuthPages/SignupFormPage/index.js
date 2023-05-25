import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    if (firstName === null || firstName === "") err.firstName = "First name is required.";
    if (lastName === null || lastName === "") err.lastName = "Last name is required.";
    if (!isValidEmail(email)) err.email = "Please provide a valid email.";
    if (username.length > 10 || username.length < 5)
      err.username = "Username must between 5 and 10 characters long.";
    if (password.length > 16 || password.length < 8)
      err.password = "Password must be between 8 and 16 characters long.";
    if (password !== confirmPassword)
      err.confirmPassword = "Confirm Password field must be the same as the Password field.";

    if (!!Object.values(err).length) {
      setErrors(err);
    } else {
      console.log("YOUR FORM IS VALID!");
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  return (
    <div className="signup-page-container">
      <img
        className="login-page-image"
        alt="city-forest"
        src="/images/backgrounds/sign-up-page.jpg"
      />
      <div className="signup-page-content">
        <div className="signup-page-left">
          <img className="pine-tree" alt="kawaii-tree" src="/images/kawaii-tree.png" />
          <h1 id="signup-greeting">Your journey begins here</h1>
          <h2 id="signup-greeting">- Douglas the Fern</h2>
        </div>
        <div className="signup-page-right">
          <h1 id="signup-page-header">Sign up</h1>
          <form onSubmit={handleSubmit}>
            {/* <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul> */}
            <div className="inputs-container">
              <div className="flex-inputs">
                <label>
                  First Name
                  <input
                    className={`auth-input ${errors.firstName && "input-error"}`}
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p className="errors">{errors.firstName}</p>
                </label>
                <label>
                  Last Name
                  <input
                    className={`auth-input ${errors.lastName && "input-error"}`}
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <p className="errors">{errors.lastName}</p>
                </label>
              </div>
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
                Username
                <input
                  className={`auth-input ${errors.username && "input-error"}`}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="errors">{errors.username}</p>
              </label>
              <label>
                Password
                <input
                  className={`auth-input ${
                    (errors.password || errors.confirmPassword) && "input-error"
                  }`}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errors">{errors.password}</p>
              </label>
              <label>
                Confirm Password
                <input
                  className={`auth-input ${
                    (errors.password || errors.confirmPassword) && "input-error"
                  }`}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p className="errors">{errors.confirmPassword}</p>
              </label>
            </div>
            <div className="signup-button">
              <button className="green-button signup" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
