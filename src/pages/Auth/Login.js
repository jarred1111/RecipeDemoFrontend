import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../../App.css";
import axios from "axios";

import { useAuth } from "../../Utilities/context/auth";
import { useInput } from "../../Utilities/Hooks/useInput";
import globalStyles from "../../css/global.module.css";
import authStyles from "../../css/auth.module.css";

function Login() {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8080/users/authenticate", {
        username: email,
        password: password,
      })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data.token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setError("Server maintinance, Please try again later.");
        setIsError(true);
      });

    resetEmail();
    resetPassword();
  };

  const handleSignUp = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8080/users/register", {
        username: email,
        password: password,
      })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data.token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setError("Server maintinance, Please try again later.");
        setIsError(true);
      });

    resetEmail();
    resetPassword();
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  function removeError() {
    setIsError(false);
    setError("");
  }

  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <form>
            <p className={globalStyles.largeHeader}> Welcome to my recipe! </p>
            <p className={globalStyles.smallHeaderV2}>please login below</p>
            <div className={authStyles.authBox}>
              {isError ? (
                <div className={authStyles.errorBox}>
                  <p className={authStyles.errorMessage}>
                    {error}
                    <button
                      className={authStyles.dismissErrBut}
                      onClick={removeError}
                    >
                      X
                    </button>
                  </p>
                </div>
              ) : (
                <></>
              )}
              <input
                type="text"
                name="text"
                {...bindEmail}
                className={authStyles.authInput}
                placeholder="email"
              ></input>
              <input
                type="password"
                name="password"
                {...bindPassword}
                className={authStyles.authInput}
                placeholder="password"
              />
              <button
                type="button"
                onClick={handleLogin}
                className={authStyles.authInputButton}
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className={authStyles.authInputButton}
              >
                Sign Up
              </button>
            </div>
          </form>
        </header>
      </div>
    </div>
  );
}

export default Login;
