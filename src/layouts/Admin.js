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
import Articulo69 from "../views/pages/Articulo69";
import { string } from "prop-types";

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

  React.useEffect(() => {
    //Si el usuario no ha iniciado sesión que se le redirija al login
    if(logged !== "true")
    {
      history.push("/auth/login");
    }
  }, []);
  
  useEffect(() => {

    //estos parametros se van a tomar del local storage o del usecontext
    const params = {
      pvOptionCRUD: "R",
      piIdCustomer : customer,
	    pvIdRole : role
    };

    var url = new URL(`http://localhost:8091/api/routes/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //console.log(url)

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

        for(var i=0; i<data.length; i++)
        {
          if(data[i].Status === true)
          {
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
                    layout: data[i].Layout_Module
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
                    layout: data[i].Layout_Module
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
                    layout: data[i].Layout_Module
                  }
                )
              }
            }
            //El componente es padre pero collapse
            else{
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
                      layout: data[i].Layout_SubModule
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
                      layout: data[i].Layout_SubModule
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
                      layout: data[i].Layout_SubModule
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
                      layout: data[i].Layout_SubModule
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
                      layout: data[i].Layout_SubModule
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
                      layout: data[i].Layout_SubModule
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
                      layout: data[i].Layout_SubModule
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
                      layout: data[i].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
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
                          layout: data[j].Layout_SubModule
                        }
                      )
                    }
                  }
                  j++
                }

                //Ya cuando se terminan de meter a los hijos agregamos la ruta
                //console.log(data[i].Icon)
                var iconn = String(data[i].Icon.toString())
                routesAux.push(
                  {
                    collapse: true,
                    name: data[i].Module_Desc,
                    icon: iconn,
                    state: data[i].Module_Desc,
                    views: views,
                  }
                )
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
              layout: "/admin",
            }
          )
          routesAux.push(
            {
              invisible: true,
              path: "/edit-application/:idApp/",
              name: "Edit Application",
              icon: "nc-icon nc-bank",
              component: EditApplication,
              layout: "/admin",
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
              layout: "/admin",
            },
          )
        }
        setDbRoutes(routesAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las rutas" + err);
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
