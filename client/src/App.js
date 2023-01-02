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
import Contact from "./pages/Contact";
import ICWA from "./pages/ICWA";
import Ethics from "./pages/Ethics";
import SUD from "./pages/SubstanceUse";
import Abuse from "./pages/Abuse";
import Ssis from "./pages/Ssis";
import Parenting from "./pages/Parenting";
import MentalHealth from "./pages/MentalHealth";
import IVE from "./pages/Iv-e";
import Interviewing from "./pages/Interviewing";
import Incarceration from "./pages/Incarceration";
import History from "./pages/History";
import FosterCare from "./pages/FosterCare";
import EdNeglect from "./pages/EdNeglect";
import DV from "./pages/DomesticViolence";
import DataPrivacy from "./pages/DataPrivacy";
import CpLaw from "./pages/CpLaw";
import Court from "./pages/Court";
import CasePlanning from "./pages/CasePlanning";
import Advocacy from "./pages/Advocacy";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

// Construct the main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
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
        <Router>
          <div>
            <Header />
          </div>
          <div>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/icwa" element={<ICWA />} />
                <Route path="/ethics" element={<Ethics />} />
                <Route path="/dataprivacy" element={<DataPrivacy />} />
                <Route path="/history" element={<History />} />
                <Route path="/advocacy" element={<Advocacy />} />
                <Route path="/dv" element={<DV />} />
                <Route path="/abuse" element={<Abuse />} />
                <Route path="/sud" element={<SUD />} />
                <Route path="/edneglect" element={<EdNeglect />} />
                <Route path="/court" element={<Court />} />
                <Route path="/cplaw" element={<CpLaw />} />
                <Route path="/incarceration" element={<Incarceration />} />
                <Route path="/mentalhealth" element={<MentalHealth />} />
                <Route path="/parenting" element={<Parenting />} />
                <Route path="/caseplanning" element={<CasePlanning />} />
                <Route path="/interviewing" element={<Interviewing />} />
                <Route path="/fostercare" element={<FosterCare />} />
                <Route path="/ssis" element={<Ssis />} />
                <Route path="/iv-e" element={<IVE />} />
                <Route path="*" element={<Home />} />
              </Routes>
          </div>
          <div>
            <Footer />
          </div>
        </Router>
    </ApolloProvider>
  );
}

export default App;
