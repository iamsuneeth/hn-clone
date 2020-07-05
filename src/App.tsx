import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { GlobalStyles } from "./theme/global";
import { Global } from "@emotion/core";
function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="/:id" render={(props) => <Home {...props} />} />
        <Route component={() => <div>Not found</div>} />
      </Switch>
    </>
  );
}

export default App;
