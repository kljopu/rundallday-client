import React from 'react';
import { useReactiveVar } from "@apollo/client"
import { LoggedOutRouter } from "./routers/logged-out-router"
import { LoggedInRouter } from './routers/LoggedInRouter';
import { isLoggedInVar } from './appolo';
// import { ApolloProvider } from "@apollo/client"
// import { client } from "./appolo"


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
