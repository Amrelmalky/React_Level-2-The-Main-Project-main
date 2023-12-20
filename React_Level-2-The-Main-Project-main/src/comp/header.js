import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { useContext } from "react";
import DataContext from "../context/ThemeContext.js";

// use Authentication state hook
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

// To sign out a user, call signOut:
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme, toggleThemeMode } = useContext(DataContext);
  return (
    <div className="myheader">
      <header className="hide-when-mobile ali">
        {/* Logo */}

        <h1>
          {user && <p> السلام عليكم</p>}
          <Link to="/signup">Code4U🧡 </Link>
        </h1>

        <ul>
          {!user && (
            <ul>
              <li className="main-list">
                <NavLink className="main-link" to="/signin">
                  Sign-In
                </NavLink>
              </li>

              <li className="main-list">
                <NavLink className="main-link" to="/signup">
                  Sign-Up
                </NavLink>
              </li>
            </ul>
          )}

          {user && (
            <li
              onClick={() => {
                const auth = getAuth();
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    console.log("sign out 100 %");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <NavLink className="main-link" to="/signin">
                Sign-Out
              </NavLink>
            </li>
          )}

          {/* if user varibale returned true the web page will be appeared  */}
          {user && (
            <ul>
              <li className="main-list">
                <NavLink className="main-link" to="/html">
                  HTML
                </NavLink>
              </li>
              <ul />

              <li className="main-list">
                <NavLink className="main-link" to="/css">
                  CSS
                </NavLink>
              </li>
              <li className="main-list">
                <NavLink className="main-link" to="/javascript">
                  JavaScript
                </NavLink>
              </li>
            </ul>
          )}
          <i
            onClick={() => {
              toggleThemeMode(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-sun"
          ></i>

          <i
            onClick={() => {
              toggleThemeMode(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-moon"
          ></i>
        </ul>
      </header>

      {/* on mobile screens */}
      <header className="show-when-mobile ali">
        <h1>c4a.dev</h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <input id="burger" type="checkbox" />
        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              HTML <i className="fas fa-plus" />
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/html">Full Course</NavLink>
              </li>
              <li>
                <a href="">Crash Course</a>
              </li>
              <li>
                <a href="">learn in 1h</a>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="css">
              CSS <i className="fas fa-plus" />
            </label>
            <input id="css" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/css">Full Course</NavLink>
              </li>
              <li>
                <a href="">CSS Examples</a>
              </li>
              <li>
                <label className="mini-projects" htmlFor="mini">
                  mini projects <i className="fas fa-plus" />
                </label>
                <input id="mini" type="checkbox" />
                <ul className="sub-sub-div">
                  <li>
                    <a href="">project 1</a>
                  </li>
                  <li>
                    <a href="">project 2</a>
                  </li>
                  <li>
                    <a href="">project 3</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="js">
              JavaScript <i className="fas fa-plus" />
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/javascript">coming soon🔥</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
