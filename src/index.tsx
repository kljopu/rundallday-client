import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from 'react-helmet-async';
import { client } from "./appolo";
import reportWebVitals from './reportWebVitals';
import "./styles/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
