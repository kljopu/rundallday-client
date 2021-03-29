import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Login } from "src/pages/Login"
import { CreateAccount } from "src/pages/CreateAccount"
import { NotFound } from "src/pages/404"

export const LoggedOutRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/create-account">
                    <CreateAccount />
                </Route>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};