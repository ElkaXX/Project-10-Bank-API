import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import BankLogo from "../assets/argentBankLogo.png";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { signOut } from "../store/authSlice";

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

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
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            'firstName'
          </Link>
          <a className="main-nav-item" onClick={() => dispatch(signOut())}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>

      {children}

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Layout;
