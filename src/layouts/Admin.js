import React, { useState, useEffect } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
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
import CustomerApplicationsUsers from "../views/components/Customers/CustomerApplicationsUsers";
import CFDIPDFRequestDetail from "../views/components/CFDIPDFRequest/CFDIPDFRequestDetail";
import SupportApplicationsSettings from "../views/components/SupportClients/SupportApplicationsSettings";
import Encriptado from "../views/pages/Encriptado";
import ControlTimbres from "../views/pages/ControlTimbres";
import RequestCustomerStampings from "../views/pages/RequestCustomerStampings";
import CrearFactura2 from "../views/pages/CrearFactura2";
import Facturacion from "../views/pages/Facturacion";
import AsignacionTimbres from "../views/pages/AsignacionTimbres";
import CustomerKeyProduct from "../views/pages/CustomerKeyProduct";
import GeneralParameters from "../views/pages/GeneralParameters";
import CustomerUoMs from "../views/pages/CustomerUoMs";
import CustomerBillTos from "../views/pages/CustomerBillTos";
import CustomerItems from "../views/pages/CustomerItems";
import CustomerItemsTaxes from "../views/pages/CustomerItemsTaxes";
import CustomerReceiptTypesSerie from "../views/pages/CustomerReceiptTypesSerie";

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

  const ambiente = process.env.REACT_APP_ENVIRONMENT

  //Para el cierre de sesión cuando no hay actividad
  const [timeout, setTimeout] = useState(1800000); //despues de media hora se cierra la sesión
  const [showModal, setShowModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [idleTimer, setIdleTimer] = useState(false);
  
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
    
    var url = new URL(`${process.env.REACT_APP_API_URI}routes/`);
 

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

        if(data.mensaje === 'Token inválida')
        {
          localStorage.setItem("Logged", false);
          localStorage.removeItem("User");
          localStorage.removeItem("Id_Role");
          localStorage.removeItem("Id_Customer");
          localStorage.removeItem("Token");
          history.push(ambiente + "/auth/login")
        }
        else{
          console.log(data)
          var dataAux = [];
          var dataAuxCount = 0;
          for(var i=0; i<data.length; i++)
          {
            if(data[i].Status === true)
            {
              dataAux[dataAuxCount] = data[i]
              dataAuxCount++
            }
          }
          console.log(dataAux)

          for(var i=0; i<dataAux.length; i++)
          {
            //console.log(data[i])
            if(dataAux[i].Component_Module!=="")
            {
              if(dataAux[i].Component_Module === "DashboardAdmin")
              {
                routesAux.push(
                  {
                    collapse: false,
                    path: dataAux[i].Url,
                    name: dataAux[i].Module_Desc,
                    icon: String(dataAux[i].Icon),
                    component: DashboardAdmin,
                    layout: ambiente + dataAux[i].Layout_Module
                  }
                )
              }
              else if(dataAux[i].Component_Module === "DashboardSoporte")
              {
                routesAux.push(
                  {
                    collapse: false,
                    path: dataAux[i].Url,
                    name: dataAux[i].Module_Desc,
                    icon: String(dataAux[i].Icon),
                    component: DashboardSoporte,
                    layout: ambiente + dataAux[i].Layout_Module
                  }
                )
              }
              else{
                routesAux.push(
                  {
                    collapse: false,
                    path: dataAux[i].Url,
                    name: dataAux[i].Module_Desc,
                    icon: String(dataAux[i].Icon),
                    component: DashboardCliente,
                    layout: ambiente + dataAux[i].Layout_Module
                  }
                )
              }
            }
            else{
              //El componente es padre pero collapse
              if(dataAux[i-1].Module_Desc !== dataAux[i].Module_Desc)
              {
                //console.log(data[i-1])
                //console.log(data[i])
                var views = []
                if(dataAux[i].Component_Submodule === "Usuarios")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: "Usuarios",
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "Encriptado")
                {
                    views.push(
                      {
                        path: dataAux[i].Url,
                        name: dataAux[i].SubModule_Desc,
                        component: Encriptado,
                        layout: ambiente + dataAux[i].Layout_SubModule
                      }
                    )
                }
                else if(dataAux[i].Component_Submodule === "CatalogosPortal")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: CatalogosPortal,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "CatalogosSAT")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: CatalogosSAT,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "Clientes")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: Clientes,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "SupportClients")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: SupportClients,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "ModuleSettings")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: ModuleSettings,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "ClienteConfiguraciones")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: ClienteConfiguraciones,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "Articulo69")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: Articulo69,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "ControlTimbres")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: ControlTimbres,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "SATProductCustomer")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: CustomerKeyProduct,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "CustomerUoMs")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: CustomerUoMs,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "CustomerItems")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: CustomerItems,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "ItemTaxes")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: CustomerItemsTaxes,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )
                }
                else if(dataAux[i].Component_Submodule === "CustomerSeries")
                {
                  views.push(
                    {
                      path: dataAux[i].Url,
                      name: dataAux[i].SubModule_Desc,
                      component: CustomerReceiptTypesSerie,
                      layout: ambiente + dataAux[i].Layout_SubModule
                    }
                  )

                }
                var j= i+1;
                while(j<dataAux.length)
                {
                  //Este ciclo se utiliza para meter a los demás hijos (cuando un padre tiene más de 1 hijo)
                  if(dataAux[i].Id_Module === dataAux[j].Id_Module && dataAux[j].Status === true)
                  {
                    if(dataAux[j].Component_Submodule === "Usuarios")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: "Usuarios",
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "Encriptado")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: Encriptado,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CatalogosPortal")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CatalogosPortal,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CatalogosSAT")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CatalogosSAT,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "Clientes")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: Clientes,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "SupportClients")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: SupportClients,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "ModuleSettings")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: ModuleSettings,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "ClienteConfiguraciones")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: ClienteConfiguraciones,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CustomerApplications")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CustomerApplications,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CFDIPDFRequest")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CFDIPDFRequest,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "ConsultaArt69")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: ConsultaArt69,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "ControlTimbres")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: ControlTimbres,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "Facturacion")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: Facturacion,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "AsignacionTimbres")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: AsignacionTimbres,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "SATProductCustomer")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CustomerKeyProduct,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "GeneralParameters")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: GeneralParameters,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CustomerUoMs")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CustomerUoMs,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CustomerBillTos")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CustomerBillTos,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CustomerItems")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CustomerItems,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "ItemTaxes")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CustomerItemsTaxes,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                    else if(dataAux[j].Component_Submodule === "CustomerSeries")
                    {
                      views.push(
                        {
                          path: dataAux[j].Url,
                          name: dataAux[j].SubModule_Desc,
                          component: CustomerReceiptTypesSerie,
                          layout: ambiente + dataAux[j].Layout_SubModule
                        }
                      )
                    }
                  }
                  j++
                }

                //Ya cuando se terminan de meter a los hijos agregamos la ruta
                var iconn = String(data[i].Icon.toString())
                var ultimo = routesAux.length
                if(routesAux[ultimo-1].name !== dataAux[i].Module_Desc)
                {
                  routesAux.push(
                    {
                      collapse: true,
                      name: dataAux[i].Module_Desc,
                      icon: iconn,
                      state: dataAux[i].Module_Desc,
                      views: views,
                    }
                  )
                }
                //console.log(routesAux[x])
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

            routesAux.push(
              {
                invisible: true,
                path: "/crear-factura/",
                name: "Crear Factura",
                icon: "nc-icon nc-bank",
                component: CrearFactura2,
                layout: ambiente + "/admin",
              },
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

            routesAux.push(
              {
                invisible: true,
                path: "/request-customer-stampings/:idCus/",
                name: "Request Customer Stampings",
                icon: "nc-icon nc-bank",
                component: RequestCustomerStampings,
                layout: ambiente + "/admin",
              },
            )

            routesAux.push(
              {
                invisible: true,
                path: "/crear-factura/",
                name: "Crear Factura",
                icon: "nc-icon nc-bank",
                component: CrearFactura2,
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
          setDbRoutes(routesAux)
        }
    })
    .catch(function(err) {
        console.log(err)
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
      if (prop.layout === ambiente + "/admin") {
        if(prop.component === "Usuarios")
        {
          return (
            <Route
              path={prop.layout + prop.path}
              key={key}
            >
              <Usuarios changeImageP = {changeImageP} setChangeImageP = {setChangeImageP}/>
            </Route>
          )
        }
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

  //Para resetear la imagen del usuario si la cambia
  const [changeImageP, setChangeImageP] = useState(false)

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
          changeImageP = {changeImageP}
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
