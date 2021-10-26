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
import IdleTimer from 'react-idle-timer';

import { Link, useHistory } from "react-router-dom";


//Importando todos los componentes que se van a utilizar
import DashboardAdmin from "../views/Dashboard.js";
import Usuarios from "../views/pages/Usuarios.js";
import ModuleSettings from "../views/pages/ModuleSettings";
import Clientes from "../views/pages/Clientes.js";
import CatalogosPortal from "../views/pages/CatalogosPortal";
import CatalogosSAT from "../views/pages/CatalogosSAT";
import AddApplication from "../views/pages/AddApplication";
import EditApplication from "../views/pages/EditApplication";
import DashboardSoporte from "../views/DashboardSupport.js";
import SupportClients from "../views/pages/SupportClients.js";
import DashboardCliente from "../views/DashboardClient.js";
import ClienteConfiguraciones from "../views/pages/ClienteConfiguraciones.js";
import EditConfiguration from "../views/pages/EditConfiguration.js";
import CustomerApplications from "../views/pages/CustomerApplications.js";
import Articulo69 from "../views/pages/Articulo69.js";
import ConsultaArt69 from "../views/pages/ConsultaArt69";
import CFDIPDFRequest from "../views/pages/CFDIPDFRequest.js";
import CustomerApplicationsUsers from "../views/components/Clients/CustomerApplicationsUsers";
import CFDIPDFRequestDetail from "../views/components/CFDIPDFRequest/CFDIPDFRequestDetail";
import SupportApplicationsSettings from "../views/components/SupportClients/SupportApplicationsSettings";
import Encriptado from "../views/pages/Encriptado";
import { string } from "prop-types";
import routes from "routes.js";

var ps;

function Admin(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [sidebarMini, setSidebarMini] = React.useState(false);
  const mainPanel = React.useRef();

  //GUARDAR EL ESTADO PARA LAS RUTAS
  const [dbRoutes, setDbRoutes] = useState([]);

  const history = useHistory();

  const logged = localStorage.getItem("Logged");
  const role = localStorage.getItem("Id_Role");
  const customer = localStorage.getItem("Id_Customer");
  const user = localStorage.getItem("User");
  const token = localStorage.getItem("Token");

  const ambiente = "/DEV"

  //Para el cierre de sesión cuando no hay actividad
  const [timeout, setTimeout] = useState(1800000); //despues de media hora se cierra la sesión
  const [showModal, setShowModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [idleTimer, setIdleTimer] = useState(false);
  
        /*this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)*/

  function _onAction(e) {
    //console.log('user did something', e)
    setIsTimedOut(false)
  }
  
  function _onActive(e) {
    //console.log('user is active', e)
    setIsTimedOut(false)
  }
  
  function _onIdle(e) {
    localStorage.setItem("Logged", false);
    localStorage.removeItem("User");
    localStorage.removeItem("Id_Role");
    localStorage.removeItem("Id_Customer");
    localStorage.removeItem("Token");
    history.push(ambiente + "/auth/login")
  }

  React.useEffect(() => {
    //Si el usuario no ha iniciado sesión que se le redirija al login
    if(logged !== "true")
    {
      history.push(ambiente + "/auth/login");
    }
  }, []);
  
  useEffect(() => {

    //estos parametros se van a tomar del local storage o del usecontext
    const params = {
      pvOptionCRUD: "R",
      piIdCustomer : customer,
	    pvIdRole : role
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/routes/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //console.log(url)

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
        var routesAux = [];
        //const ambiente = "/QSDEV"
       
        for(var i=0; i<data.length; i++)
        {
          if(data[i].Status === true)
          {
            //console.log(data[i])
            if(data[i].Component_Module!=="")
            {
              if(data[i].Component_Module === "DashboardAdmin")
              {
                routesAux.push(
                  {
                    collapse: false,
                    path: data[i].Url,
                    name: data[i].Module_Desc,
                    icon: String(data[i].Icon),
                    component: DashboardAdmin,
                    layout: ambiente + data[i].Layout_Module
                  }
                )
              }
              else if(data[i].Component_Module === "DashboardSoporte")
              {
                routesAux.push(
                  {
                    collapse: false,
                    path: data[i].Url,
                    name: data[i].Module_Desc,
                    icon: String(data[i].Icon),
                    component: DashboardSoporte,
                    layout: ambiente + data[i].Layout_Module
                  }
                )
              }
              else{
                routesAux.push(
                  {
                    collapse: false,
                    path: data[i].Url,
                    name: data[i].Module_Desc,
                    icon: String(data[i].Icon),
                    component: DashboardCliente,
                    layout: ambiente + data[i].Layout_Module
                  }
                )
              }
            }
            else{
              //El componente es padre pero collapse
              if(data[i-1].Module_Desc !== data[i].Module_Desc)
              {
                var views = []
                if(data[i].Component_Submodule === "Usuarios")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: Usuarios,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                else if(data[i].Component_Submodule === "Encriptado")
                {
                    views.push(
                      {
                        path: data[i].Url,
                        name: data[i].SubModule_Desc,
                        component: Encriptado,
                        layout: ambiente + data[i].Layout_SubModule
                      }
                    )
                }
                else if(data[i].Component_Submodule === "CatalogosPortal")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: CatalogosPortal,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                else if(data[i].Component_Submodule === "CatalogosSAT")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: CatalogosSAT,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                else if(data[i].Component_Submodule === "Clientes")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: Clientes,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                else if(data[i].Component_Submodule === "SupportClients")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: SupportClients,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                else if(data[i].Component_Submodule === "ModuleSettings")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: ModuleSettings,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                else if(data[i].Component_Submodule === "ClienteConfiguraciones")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: ClienteConfiguraciones,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                else if(data[i].Component_Submodule === "Articulo69")
                {
                  views.push(
                    {
                      path: data[i].Url,
                      name: data[i].SubModule_Desc,
                      component: Articulo69,
                      layout: ambiente + data[i].Layout_SubModule
                    }
                  )
                }
                var j= i+1;
                while(j<data.length)
                {
                  //Este ciclo se utiliza para meter a los demás hijos (cuando un padre tiene más de 1 hijo)
                  if(data[i].Id_Module === data[j].Id_Module && data[j].Status === true)
                  {
                    if(data[j].Component_Submodule === "Usuarios")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: Usuarios,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "Encriptado")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: Encriptado,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "CatalogosPortal")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: CatalogosPortal,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "CatalogosSAT")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: CatalogosSAT,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "Clientes")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: Clientes,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "SupportClients")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: SupportClients,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "ModuleSettings")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: ModuleSettings,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "ClienteConfiguraciones")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: ClienteConfiguraciones,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "CustomerApplications")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: CustomerApplications,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "CFDIPDFRequest")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: CFDIPDFRequest,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                    else if(data[j].Component_Submodule === "ConsultaArt69")
                    {
                      views.push(
                        {
                          path: data[j].Url,
                          name: data[j].SubModule_Desc,
                          component: ConsultaArt69,
                          layout: ambiente + data[j].Layout_SubModule
                        }
                      )
                    }
                  }
                  j++
                }

                //Ya cuando se terminan de meter a los hijos agregamos la ruta
                var iconn = String(data[i].Icon.toString())
                var ultimo = routesAux.length
                if(routesAux[ultimo-1].name !== data[i].Module_Desc)
                {
                  routesAux.push(
                    {
                      collapse: true,
                      name: data[i].Module_Desc,
                      icon: iconn,
                      state: data[i].Module_Desc,
                      views: views,
                    }
                  )
                }
                //console.log(routesAux[x])
              }
            }
          }
        }
        //Agregar rutas solo para roles en específico
        if(params.pvIdRole == "GTCADMIN")
        {
          routesAux.push(
            {
              invisible: true,
              path: "/add-application",
              name: "Add Application",
              icon: "nc-icon nc-bank",
              component: AddApplication,
              layout: ambiente + "/admin",
            }
          )
          routesAux.push(
            {
              invisible: true,
              path: "/edit-application/:idApp/",
              name: "Edit Application",
              icon: "nc-icon nc-bank",
              component: EditApplication,
              layout:  ambiente + "/admin",
            }
          )

          routesAux.push(
            {
              invisible: true,
              path: "/customer-application-users/:idCus/:idApp/",
              name: "Customer Application Users",
              icon: "nc-icon nc-bank",
              component: CustomerApplicationsUsers,
              layout:  ambiente + "/admin",
            }
          )
        }
        else if(params.pvIdRole == "CUSAPPLI")
        {
          routesAux.push(
            {
              invisible: true,
              path: "/edit-configuration/:idApp/",
              name: "Edit Configuration",
              icon: "nc-icon nc-bank",
              component: EditConfiguration,
              layout: ambiente + "/admin",
            },
          )
        }
        else if(params.pvIdRole == "GTCSUPPO")
        {
          routesAux.push(
            {
              invisible: true,
              path: "/cfdi-requests/:idCus/:idReq/",
              name: "CFDI PDF Requests Detail",
              icon: "nc-icon nc-bank",
              component: CFDIPDFRequestDetail,
              layout:  ambiente + "/admin",
            }
          )
          routesAux.push(
            {
              invisible: true,
              path: "/application-settings/:idCus/:idApp/",
              name: "Applications Settings",
              icon: "nc-icon nc-bank",
              component: SupportApplicationsSettings,
              layout:  ambiente + "/admin",
            }
          )
        }
        //Ruta para cambiar contraseña
        //console.log(routesAux)
        setDbRoutes(routesAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las rutas" + err);
    });
  }, []);

  useEffect(() => {

    if(logged === "true")
    {
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
          if(data[0].Temporal_Password===true)
          {
            localStorage.setItem("Logged", false);
            localStorage.removeItem("User");
            localStorage.removeItem("Id_Role");
            localStorage.removeItem("Id_Customer");
            localStorage.removeItem("Token");
            localStorage.removeItem("Name");
            localStorage.removeItem("P_Picture");
            history.push(ambiente + "/auth/login");
          }
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion del usuario" + err);
      });
    }
  },[]);

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
      if (prop.layout === ambiente + "/admin") {
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
        <IdleTimer
            ref={ref => { setIdleTimer(ref) }}
            element={document}
            onActive={_onActive}
            onIdle={_onIdle}
            onAction={_onAction}
            debounce={250}
            timeout={timeout} 
        />
        
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
