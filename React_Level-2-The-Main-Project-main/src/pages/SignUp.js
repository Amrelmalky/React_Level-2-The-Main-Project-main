import React, { useState } from "react";
import Header from "../comp/header";
import Footer from "../comp/Footer";
import "../theme.css";
import { Link } from "react-router-dom";

// Sign up import Authenticatin
import { auth } from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import use navigate
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handel Error and appear paragarph
  const [hasError, setHasError] = useState(false);
  // Show Firebase error message
  const [firebaseErrorMsg, setFirebaseErrorMsg] = useState("");

  return (
    <>
      <Header />

      <main>
        <form id="signUpForm">
          <p> Sign Up :</p>

          <input
            onChange={(eo) => {
              setEmail(eo.target.value);
            }}
            type="text"
            id="Email"
            name="Email"
            required=""
            placeholder="insert your Email."
          />

          <input
            onChange={(eo) => {
              setPassword(eo.target.value);
            }}
            type="password"
            id="password"
            name="password"
            required=""
            placeholder="insert pass"
          />

          <button
            onClick={(eo) => {
              // To prevent page from loading..
              eo.preventDefault();
              const auth = getAuth();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed up
                  const user = userCredential.user; // ...
                  console.log(user);
                  // Navigate to home page Route (/)
                  navigate("/signin");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message; // ..
                  console.log(errorMessage);
                  setHasError(true)

                  // switch case for firebase errors

                  switch (errorCode) {
                    case "auth/missing-email":
                      setFirebaseErrorMsg("pls insert your email.. 🧡");
                      break;

                    case "auth/invalid-email":
                      setFirebaseErrorMsg("pls insert correct email.. 🧡");
                      break;

                    case "auth/missing-password":
                      setFirebaseErrorMsg("pls insert your pass.. 🧡");
                      break;
                    case "auth/invalid-credential":
                      setFirebaseErrorMsg(
                        " inserted email or passward invalid pls try again 🧡"
                      );
                      break;

                    case "auth/too-many-requests":
                      setFirebaseErrorMsg("pls try again late 🧡");
                      break;

                    default:
                      setFirebaseErrorMsg(errorMessage);
                      break;
                  }
                });
            }}
            className="active"
            type="button"
            to="/"
          >
            Sign Up
          </button>

          {!hasError &&
          (
            <p className="account">
              If you already have an account pls
              <Link to="/signin"> Sign-In </Link>
            </p>
          )}

          {hasError && <p className="error">{firebaseErrorMsg}</p>}
        </form>
      </main>

      <Footer />
    </>
  );
};

export default SignUp;
