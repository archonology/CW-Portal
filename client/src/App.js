import React from "react";
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
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";

// adminLogin is not in the navbar: admin will need to know the url to navigate to this page, so that it isn't available to the public at large. use env after development phase to conceal url route

import AdminLogin from "./pages/AdminLogin";

import Header from "./components/Header/index";
import Footer from "./components/Footer";

import "./App.css";
import ResourceList from "./components/ResourceList";

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
  return (
    <ApolloProvider client={client}>
            {/* keeps the default theme dark across site */}
            <ThemeProvider theme={darkTheme}>
        <Router>
          <div>
            <Header />
          </div>
          <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/secreturl" element={<AdminLogin />} />
                <Route path="/contact" element={<Contact />} />
                {ResourceList.map((resource) => (
                <Route key={resource} path= {"/resources" + resource.url } element={<Resources />} />
                ))};

                <Route path="/*" element={<Home />} />
              </Routes>
          </div>
          <div>
            <Footer />
          </div>
        </Router>
        </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
