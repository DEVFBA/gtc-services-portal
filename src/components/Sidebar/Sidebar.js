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
import { Nav, Collapse } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import avatar from "assets/img/faces/ayo-ogunseinde-2.jpg";
import avatarDefault from "assets/img/default-avatar.png";
import logo from "assets/img/react-logo.png";
import logogtc from "assets/img/favicon-GTC.png";
import { NavLink, useHistory } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Modal, 
  ModalBody, 
  ModalFooter
} from "reactstrap";

var ps;

function Sidebar(props) {
  const [openAvatar, setOpenAvatar] = React.useState(false);
  const [collapseStates, setCollapseStates] = React.useState({});
  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState("");
  const sidebar = React.useRef();
  const Logged = localStorage.getItem("Logged");
  const [routeProfile, setRouteProfile] = React.useState("");
  const ambiente = "/DEV"
  
  const history = useHistory();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through props.routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };

  useEffect(() => {
    if(Logged === "true")
    {
      const token = localStorage.getItem("Token");
      //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
      const params = {
        pvOptionCRUD: "R"
      };
  
      var url = new URL(`http://129.159.99.152/develop-api/api/general-parameters/`);
  
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
      fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
      })
      .then(function(response) {
          return response.ok ? response.json() : Promise.reject();
      })
      .then(function(data) {
          var aux = data.find( o => o.Id_Catalog === 9)
          //console.log(aux.Value)
          setRouteProfile(aux.Value)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de la Profile_Picture" + err);
      });
    }
  }, []);

  useEffect(() => {
    //Si el usuario no está loggeado no se va a descargar la imagen
    if(Logged === "true")
    {
      var user = localStorage.getItem("User");
      const token = localStorage.getItem("Token");
      var url = new URL(`http://129.159.99.152/develop-api/api/security-users/${user}`);
      fetch(url, {
        method: "GET",
        headers: {
            "access-token": token,
            "Content-Type": "application/json",
        }
      })
      .then(function(response) {
          return response.ok ? response.json() : Promise.reject();
      })
      .then(function(data) {
          setImage(data[0].Profile_Pic_Path)
          setName(data[0].Name)
          //console.log(data)
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion del usuario en sidebar" + err);
      });
    }  
  },[]);

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.invisible) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !collapseStates[prop.state];
        return (
          <li
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={collapseStates[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                setCollapseStates(st);
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={collapseStates[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink to={prop.layout + prop.path} activeClassName="">
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  React.useEffect(() => {
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      // we need to destroy the false scrollbar when we navigate
      // to a page that doesn't have this component rendered
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  React.useEffect(() => {
    setCollapseStates(getCollapseStates(props.routes));
  }, []);

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href="https://www.creative-tim.com"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logogtc} alt="react-logo" />
          </div>
        </a>
        <a
          href="https://www.creative-tim.com"
          className="simple-text logo-normal"
        >
          Portal GTC
        </a>
      </div>

      <div className="sidebar-wrapper" ref={sidebar}>
        <div className="user">
          {image !== "" ? (
            <div className="photo">
              <img src={routeProfile + image} alt="Avatar" />
            </div>
          ) : (
            <div className="photo">
              <img src={avatarDefault} alt="Avatar" />
            </div>
          )
          }
          
          <div className="info">
            <a
              href="#"
              data-toggle="collapse"
              aria-expanded={openAvatar}
              onClick={() => setOpenAvatar(!openAvatar)}
            >
              <span>
                {/*AQUI VA EL NOMBRE DEL USUARIO*/}
                {name}
                {/*<b className="caret" />*/}
              </span>
            </a>
          </div>
        </div>
        <Nav>{createLinks(props.routes)}</Nav>
      </div>
    </div>
  );
}

export default Sidebar;
