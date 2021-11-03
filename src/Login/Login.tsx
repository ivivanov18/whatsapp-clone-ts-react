import React from "react";
import "./Login.scss";

function Login() {
  return (
    <div className="app">
      <div className="login">
        <div className="login__container">
          <img src="./logo.png" alt="Logo whatsapp" />
          <div className="login__text">Login to Whatsapp</div>
          <button>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
