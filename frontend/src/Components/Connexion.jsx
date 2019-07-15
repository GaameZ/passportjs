import React, { useState } from "react";
import axios from "axios";
import { host } from "../conf";
import { connect } from "react-redux";

function ConnexionComponent(props) {
  const { onlineStatus, dispatch, history } = props;
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const submitForm = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${host}/auth/signin`,
        {
          email: values.email,
          password: values.password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("id", user.id);
        localStorage.setItem("email", user.email);
        dispatch({ type: "ONLINE" });
        history.push("/");
      })
      .catch(error => {
        console.log(error.response.data.info.message);
      });
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label>
            Adresse email :
            <input
              type="email"
              name="email"
              id="email"
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            Mot de passe :
            <input
              type="password"
              name="password"
              id="password"
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </label>
        </div>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  onlineStatus: state
});

const Connexion = connect(mapStateToProps)(ConnexionComponent);

export default Connexion;
