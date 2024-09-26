import { Link, Navigate } from "react-router-dom";
import BankLogo from "../assets/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import api from "../api";
import { signOut } from "../store/authSlice";

function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { token, isAuthorized } = useSelector(
    (state: RootState) => state.authentication
  );
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const getProfile = async () => {
    const { firstName, lastName } = await api.user.getProfile(token!);
    setFirstname(firstName);
    setLastname(lastName);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!isAuthorized) {
    return <Navigate replace to="/sign-in" />;
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
          <Link className="main-nav-item" to="/home">
            <i className="fa fa-user-circle"></i>
            {firstName}
          </Link>
          <a className="main-nav-item" onClick={() => dispatch(signOut())}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {`${firstName} ${lastName}!`}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default Home;
