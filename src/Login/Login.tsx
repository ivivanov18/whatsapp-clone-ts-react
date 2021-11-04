import React from "react";
import Button from "@mui/material/Button";
import { auth, provider, signIn } from "../firebaseApp";

import "./Login.scss";

type LoginProps = {};

function Login(props: LoginProps) {
  const login = () => {
    signIn(auth, provider);
  };

  return (
    <div className="app">
      <div className="login">
        <div className="login__container">
          <img src="./logo.png" alt="Logo whatsapp" />
          <div className="login__text">Login to Whatsapp</div>
          <Button variant="contained" onClick={login}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
