import "../css/main.css";
import BankLogo from "../assets/argentBankLogo.png";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useState } from "react";
import { login } from "../store/authSlice";
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticationState = useSelector(
    (state: RootState) => state.authentication
  );
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = async () => {
    await dispatch(login({ email: username, password }));
  };

  if (authenticationState.isAuthorized) {
    return <Navigate replace to={"/home"} />;
  }

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={BankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-logo" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label>Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label>Remember me</label>
            </div>
            <button
              className="sign-in-button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Sign In
            </button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default SignIn;
