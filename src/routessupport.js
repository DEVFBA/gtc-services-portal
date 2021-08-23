import DashboardSoporte from "views/DashboardSupport.js";
import SupportClients from "views/pages/SupportClients.js";
import CatalogosPortal from "views/pages/CatalogosPortal";
import CatalogosSAT from "views/pages/CatalogosSAT";

const routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: DashboardSoporte,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Clientes",
    icon: "nc-icon nc-badge",
    state: "componentsCollapse",
    views: [
      {
        path: "/modules",
        name: "Módulos",
        mini: "M",
        component: SupportClients,
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
];

export default routes;