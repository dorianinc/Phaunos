import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/AuthPages/SignupFormPage";
import LoginFormPage from "./components/AuthPages/LoginFormPage";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";
import UserProfile from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/profile">
            <UserProfile/>
          </Route>
          <Route path="/">
            <SplashPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
