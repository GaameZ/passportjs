import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Bar from "./Components/Bar";
import Home from "./Components/Home";
import Inscription from "./Components/Inscription";
import Connexion from "./Components/Connexion";
import Hooks from "./Components/Hooks";
import { connect } from "react-redux";

function AppComponent(props) {
  const { dispatch } = props;
  useEffect(() => {
    localStorage.getItem("token")
      ? dispatch({ type: "ONLINE" })
      : dispatch({ type: "OFFLINE" });
  });

  return (
    <React.Fragment>
      <Bar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/inscription" component={Inscription} />
        <Route path="/connexion" component={Connexion} />
        <Route path="/hooks" component={Hooks} />
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  onlineStatus: state
});

const App = connect(mapStateToProps)(AppComponent);

export default App;
