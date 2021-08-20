import DashboardAdmin from "views/Dashboard.js";
import Usuarios from "views/pages/Usuarios.js";
import ModuleSettings from "views/pages/ModuleSettings";
import Clientes from "views/pages/Clientes.js";
import CatalogosPortal from "views/pages/CatalogosPortal";
import CatalogosSAT from "views/pages/CatalogosSAT";

const routes = [
  {
    collapse: false,
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: DashboardAdmin,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Configuración",
    icon: "nc-icon nc-settings-gear-65",
    state: "ConfigCollapse",
    views:[
      {
        path: "/users",
        name: "Usuarios",
        component: Usuarios,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Catálogos",
    icon: "nc-icon nc-single-copy-04",
    state: "CatalogsCollapse",
    views: [
      {
        path: "/portal-catalogs",
        name: "Portal",
        component: CatalogosPortal,
        layout: "/admin",
      },
      {
        path: "/sat-catalogs",
        name: "SAT",
        component: CatalogosSAT,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Clientes",
    icon: "nc-icon nc-badge",
    state: "ClientsCollapse",
    views: [
      {
        path: "/clients",
        name: "Clientes",
        component: Clientes,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Módulos",
    icon: "nc-icon nc-box-2",
    state: "ModulesCollapse",
    views: [
      {
        path: "/module-settings",
        name: "Configuraciones",
        component: ModuleSettings,
        layout: "/admin",
      },
    ],
  },
];

export default routes;