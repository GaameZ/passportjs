import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function BarComponent(props) {
  const { onlineStatus, dispatch } = props;
  const deconnect = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    dispatch({ type: "OFFLINE" });
  };
  return (
    <div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {onlineStatus !== "online" ? (
          <React.Fragment>
            <li>
              <Link to={"/inscription"}>Inscription</Link>
            </li>
            <li>
              <Link to={"/connexion"}>Connexion</Link>
            </li>
          </React.Fragment>
        ) : null}

        <li>
          <Link to={"/hooks"}>Hooks</Link>
        </li>
        {onlineStatus === "online" ? (
          <li>
            <Link to={"/"} onClick={deconnect}>
              Deconnexion
            </Link>
          </li>
        ) : null}
        {onlineStatus}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  onlineStatus: state
});

const Bar = connect(mapStateToProps)(BarComponent);

export default Bar;
