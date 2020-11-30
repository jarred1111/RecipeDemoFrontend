import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Discover from './pages/Discover/Discover';
import MyRecipe from './pages/MyRecipe/MyRecipe';

import PrivateRoute from "./Utilities/Routing/PrivateRoute";
import { AuthContext } from "./Utilities/context/auth";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Discover}/>
          <PrivateRoute path="/my-recipes" component={MyRecipe}/>
          <Route path="/auth" component={Login} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
