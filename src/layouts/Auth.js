/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";

import routes from "routes.js";

import Login from "views/pages/Login.js";
import EditPassword from "views/pages/ChangePassword";
import Register from "views/pages/Register.js";
import LockScreen from "views/pages/LockScreen.js";
import ChooseCustomer from "../views/pages/ChooseCustomer";

var ps;

function Pages() {
  //GUARDAR EL ESTADO PARA LAS RUTAS
  const [dbRoutes, setDbRoutes] = useState([]);
  const ambiente = "/DEV"
  useEffect(() => {
    var routesAux = [];
    //Agregando las rutas del auth
    //const ambiente = "/QSDEV"
    
    routesAux.push(
      {
        invisible: true,
        path: "/edit-password/",
        name: "Edit Password",
        icon: "nc-icon nc-bank",
        component: EditPassword,
        layout: ambiente + "/auth",
      },
    )
    routesAux.push(
      {
        invisible: true,
        path: "/login/",
        name: "Login",
        icon: "nc-icon nc-bank",
        component: Login,
        layout: ambiente + "/auth",
      },
    )
    routesAux.push(
      {
        invisible: true,
        path: "/register/",
        name: "Register",
        icon: "nc-icon nc-bank",
        component: Register,
        layout: ambiente + "/auth",
      },
    )
    routesAux.push(
      {
        invisible: true,
        path: "/lock-screen/",
        name: "Lock Screen",
        icon: "nc-icon nc-bank",
        component: LockScreen,
        layout: ambiente + "/auth",
      },
    )
    routesAux.push(
      {
        invisible: true,
        path: "/choose-customer/",
        name: "Choose Customer",
        icon: "nc-icon nc-bank",
        component: ChooseCustomer,
        layout: ambiente + "/auth",
      },
    )
    setDbRoutes(routesAux)
  }, []);
  const fullPages = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(fullPages.current);
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === ambiente + "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <AuthNavbar />
      <div className="wrapper wrapper-full-page" ref={fullPages}>
        <div className="full-page section-image">
          <Switch>{getRoutes(dbRoutes)}</Switch>
          <Footer fluid />
        </div>
      </div>
    </>
  );
}

export default Pages;
