import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Login } from "src/pages/login"
import { CreateAccount } from "src/pages/create-account"

export const LoggedOutRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/create-account">
                    <CreateAccount />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
};