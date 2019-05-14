import React, { Component } from "react";
import Loader from "./Loader";
import SvgRaccoon from "./svg/SvgRaccoon";
import Auth from "../lib/auth";
const auth = new Auth();

class Login extends Component {
  componentDidMount() {
    auth.login();
  }

  render() {
    return (
      <main className="container">
        <div className="login-splash full-bleed">
          <SvgRaccoon color="white" />
          <h1>pinster</h1>
          <Loader />
        </div>
      </main>
    );
  }
}

export default Login;
