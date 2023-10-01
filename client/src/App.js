import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import OneTopic from "./components/OneTopic";
import Subtopic from "./components/OneSubtopic";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Donate from "./pages/Donate";
import ContentCreator from "./pages/ContentCreator";
import AddTopic from "./pages/AddTopic";
import AddSubtopic from "./pages/AddSubtopic";
import AddResource from "./pages/AddResource";
import AddQuickLink from "./pages/AddQuickLink";
import AddPost from "./pages/AddPost";
import Search from "./pages/Search";


// adminLogin is not in the navbar: admin will need to know the url to navigate to this page, so that it isn't available to the public at large. use env after development phase to conceal url route
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";

import Header from "./components/Header/index";
import Footer from "./components/Footer";

import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";





// Construct the main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

//dark theme by default
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return (

    <ApolloProvider client={client}>
      {/* keeps the default theme dark across site */}
      <ThemeProvider theme={darkTheme}>
        <Router>
          <div>
            <Header />
            <div className="donate">
              <a href='https://buy.stripe.com/cN26ox1O4eMkf7ifYY' target='_blank' rel='nonreferrer'><button className="donate-button">DONATE</button></a>
            </div>
          </div>
          <div className="footspace">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources/:_id" element={<OneTopic />} />
              <Route path="/subtopic/:_id" element={<Subtopic />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contentcreator" element={<ContentCreator />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="contentcreator/addtopic" element={<AddTopic />} />
              <Route path="contentcreator/addsubtopic" element={<AddSubtopic />} />
              <Route path="contentcreator/addresource" element={<AddResource />} />
              <Route path="contentcreator/addquicklink" element={<AddQuickLink />} />
              <Route path="contentcreator/addpost" element={<AddPost />} />
              {/* build in progess on donation features */}
              <Route path="/donate" element={<Donate />} />
              <Route path={process.env.REACT_APP_ADMIN_LOGIN_KEY} element={<AdminLogin />} />
              <Route path={process.env.REACT_APP_ADMIN_SIGNUP_KEY} element={<AdminSignup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </div>
          <div >
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
