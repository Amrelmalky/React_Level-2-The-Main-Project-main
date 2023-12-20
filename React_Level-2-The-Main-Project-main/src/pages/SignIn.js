import React, { useState } from "react";
import Header from "../comp/header";
import Footer from "../comp/Footer";
import "../theme.css";

//
import { auth } from "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// use Authentication state hook
import { useAuthState } from "react-firebase-hooks/auth";

// Import useNavigate hook from react router
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // Handel Error and appear paragarph
  const [hasError, setHasError] = useState(false);
  // Show Firebase error message
  const [firebaseErrorMsg, setFirebaseErrorMsg] = useState("");

  return (
    <>
      <Header />

      <main>
        <form id="signInForm">
          {user && (
            <span className={"register"}> Thank You for your Regsister</span>
          )}
          <p> please Sign in :</p>

          <input
            onChange={(eo) => {
              setEmail(eo.target.value);
            }}
            type="text"
            id="nameOrEmail"
            name="nameOrEmail"
            required=""
            placeholder="insert your email"
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
              eo.preventDefault();
              const auth = getAuth();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  // ...
                  console.log(user);
                  // Naviagte User to home page
                  navigate("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  setHasError(true);

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
            Sign In
          </button>
          {hasError && <p className="error">{firebaseErrorMsg}</p>}
        </form>
      </main>

      <Footer />
    </>
  );
};

export default SignIn;
