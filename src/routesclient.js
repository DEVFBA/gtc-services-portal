import DashboardCliente from "views/DashboardClient.js";
import ClienteConfiguraciones from "views/pages/ClienteConfiguraciones.js";

const routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: DashboardCliente,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Módulos",
    icon: "nc-icon nc-box-2",
    state: "pagesCollapse",
    views: [
      {
        path: "/client-setting",
        name: "Configuraciones",
        component: ClienteConfiguraciones,
        layout: "/admin",
      },
    ],
  },
];

export default routes;