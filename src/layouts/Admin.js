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
import { Route, Switch, useLocation } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import routesadmin from "routesadmin.js";
import routessupport from "routessupport";
import routesclient from "routesclient";

var ps;

function Admin(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [sidebarMini, setSidebarMini] = React.useState(false);
  const mainPanel = React.useRef();

  //Renderizado condicionado para saber las rutas dependiendo el tipo de usuario
  const [side, setSide] = useState();
  const [adminNav, setAdminNav] = useState();

  //GUARDAR EL ESTADO PARA LAS RUTAS
  const [dbRoutes, setDbRoutes] = useState([]);

  const [dbPrueba, setDbPrueba] = useState([]);

  //Para revisar qué tipo de RUTAS (En este caso MENU) mostrar
  const tipo = localStorage.getItem("tipo");

  useEffect(() => {
    //Para saber qué tipo de rutas se van a tomar
    //Se van a jalar de la base de datos dependiendo el tipo de usuario
    //Por el momento se usará el tipo del localstorage
    setDbRoutes(routesadmin);
    console.log(dbRoutes)
    if(tipo === "administrador"){
      setDbRoutes(routesadmin)
      /*setSide(
        <Sidebar
        {...props}
        routes={routesadmin}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      );
      setAdminNav(
        <Switch>{getRoutes(routesadmin)}</Switch>
      )*/
    }
    else if(tipo == "support"){
      setDbRoutes(routessupport)
      /*setSide(
        <Sidebar
        {...props}
        routes={routessupport}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      );
        console.log(side)
      setAdminNav(
        <Switch>{getRoutes(routessupport)}</Switch>
      )*/
    }
    else{
      setDbRoutes(routesclient) 
      /*setSide(
        <Sidebar
        {...props}
        routes={routesclient}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      );
        console.log(side)
      setAdminNav(
        <Switch>{getRoutes(routesclient)}</Switch>
      )*/
    }
  }, []);

  useEffect(() => {

    //estos parametros se van a tomar del local storage o del usecontext
    const params = {
      pvOptionCRUD: "R",
      pIdCustomer : 1,
	    pvIdRole : "GTCSUPPO"
    };

    var url = new URL(`http://localhost:8091/api/routes/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url)

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(function(response) {
        return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {

        var routesAux = [];
        //console.log(data[0].Component_Module);
        for(var i=0; i<data.length; i++)
        {
          if(data[i].Status === true)
          {
            if(data[i].Component_Module!=="")
            {
              routesAux.push(
                {
                  collapse: false,
                  path: data[i].Url,
                  name: data[i].Module_Desc,
                  icon: data[i].Icon,
                  component: data[i].Component_Module,
                  layout: data[i].Layout_Module
                }
              )
            }
            else{
              //if(data[i-1].Id_Module !== data[i].Id_Module && data[i].Status === true)
              //{
                var views = []
                views.push(
                  {
                    path: data[i].Url,
                    name: data[i].SubModule_Desc,
                    component: data[i].Component_Submodule,
                    layout: data[i].Layout_SubModule
                  }
                )
                var j= i+1;
                while(j<data.length)
                {
                  if(data[i].Id_Module === data[j].Id_Module && data[j].Status === true)
                  {
                    views.push(
                      {
                        path: data[j].Url,
                        name: data[j].SubModule_Desc,
                        component: data[j].Component_Submodule,
                        layout: data[j].Layout_SubModule
                      }
                    )
                  }
                  j++
                }
                console.log("Valor de i: " + data[i].Id_Module + " y de i-1: " + data[i-1].Id_Module)
                routesAux.push(
                  {
                    collapse: true,
                    name: data[i].Module_Desc,
                    icon: data[i].Icon,
                    views: views,
                  }
                )
              //}
            }
          }
        }
        console.log(routesAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las rutas");
    });
  }, []);



  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanel.current);
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === "/admin") {
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

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };

  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  const handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle("sidebar-mini");
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={dbRoutes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      {/*side*/}
      <div className="main-panel" ref={mainPanel}>
        <AdminNavbar {...props} handleMiniClick={handleMiniClick} />
        <Switch>{getRoutes(dbRoutes)}</Switch>
        {/*adminNav*/}
        {
          // we don't want the Footer to be rendered on full screen maps page
          props.location.pathname.indexOf("full-screen-map") !== -1 ? null : (
            <Footer fluid />
          )
        }
      </div>
      {/*<FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        sidebarMini={sidebarMini}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
        handleMiniClick={handleMiniClick}
      /> */}
      </div>
  );
}

export default Admin;
