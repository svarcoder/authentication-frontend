import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">{"ABC Company"}</div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
          <LoginButton />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
