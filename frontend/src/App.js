import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Home from "./screens/Home";
import SignIn from "./screens/Sign-in";
import SignUp from "./screens/Sign-up";
import ManagePortal from "./screens/Manage/Portal";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/sign-in">Sign-in</Link>
              <Link to="/sign-up">Sign-up</Link>
              <Link to="/manage/portal">Portal</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/manage/portal">
            <ManagePortal />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
