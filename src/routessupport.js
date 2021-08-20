import Dashboard from "views/DashboardSupport.js";
import SupportClients from "views/pages/SupportClients.js";

const routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Clientes",
    icon: "nc-icon nc-badge-2",
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
];

export default routes;