import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MealDetails from "./pages/MealDetails";
import SearchForm from "./pages/SearchForm";
import Success from "./pages/Success";
import "typeface-poppins";

import { RecipeProvider } from "./utils/GlobalState";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
    // enables the usage of Apollo Client for GraphQL queries and mutations.

    //client props configures the GraphQL API endpoint and the authentication middleware.
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div
          className="flex-column justify-flex-start parent"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {/* This makes the state and dispatch function available to those
          components. */}

          <RecipeProvider>
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search" element={<SearchForm />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/profiles/:username" element={<Profile />} />
                <Route path="/recipe/:idMeal" element={<MealDetails />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </div>
          </RecipeProvider>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;