import React from "react";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

function App() {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    console.log(ambiente)
    const auth = ambiente + "/auth"
    const admin = ambiente + "/admin"
    const login = ambiente + "/auth/login"
    return(
        <>
            <BrowserRouter>
                <Switch>
                <Route path = {auth} render={(props) => <AuthLayout {...props} />} />
                <Route path = {admin} render={(props) => <AdminLayout {...props} />} />
                <Redirect to = {login} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App;