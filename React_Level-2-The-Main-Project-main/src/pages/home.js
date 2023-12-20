import Header from "../comp/header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

// use Authentication state hook
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <Helmet>
        <title>HOME Page</title>
        <meta name="description" content="HOMEEEEEEEEEEEE" />
      </Helmet>

      <Header />

      {!user && (
        <main>
          <h2 className="hidenContent">
          
            Thanks to Sign In first <Link to={"/signIn"}> Sign-In </Link> to show contents 
          </h2>
          
        </main>
      )}

      {user && <MainContent pageName="HOME Page" />}

      <Footer />
    </>
  );
};

export default Home;
