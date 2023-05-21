import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/AuthPages/SignupFormPage";
import LoginFormPage from "./components/AuthPages/LoginFormPage";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import TrailDetails from "./components/Trails/TrailDetails";

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
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/trails/:trailId" component={TrailDetails} />
          <Route path="/" component={SplashPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
