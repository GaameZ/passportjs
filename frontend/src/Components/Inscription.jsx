import React, { useState } from "react";
import axios from "axios";
import { host } from "../conf";

export default function Inscription(props) {
  const [values, setValues] = useState({
    pseudo: "",
    email: "",
    password: "",
    passwordConfirm: "",
    message: ""
  });
  const submitForm = event => {
    event.preventDefault();
    axios
      .post(`${host}/auth/signup`, {
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        pseudo: values.pseudo
      })
      .then(({ data }) => {
        alert(data.message);
        props.history.push("/connexion");
      })
      .catch(error => {
        setValues({ ...values, message: error.response.data.message });
      });
  };
  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={submitForm}>
        <div>
          <label>
            Nom :
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              placeholder="Nom"
              onChange={e => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </label>
        </div>
        <div>
          <label>
            E-mail :
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Adresse email"
              onChange={e => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
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
              placeholder="Mot de passe"
              onChange={e => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Confirmer mot de passe :
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirmer mot de passe"
              onChange={e => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {values.message !== "" ? values.message : null}
    </div>
  );
}
