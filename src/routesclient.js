import Dashboard from "views/DashboardClient.js";
import Timeline from "views/pages/Timeline.js";
import Users from "views/pages/Usuarios.js";
import ModuleSettings from "views/pages/ModuleSettings";
import Clientes from "views/pages/Clientes.js";

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
    name: "Modules",
    icon: "nc-icon nc-box-2",
    state: "pagesCollapse",
    views: [
      {
        path: "/timbrado",
        name: "Timbrado",
        mini: "T",
        component: Timeline,
        layout: "/admin",
      },
      {
        path: "/envio-pdf",
        name: "Envio Pdf",
        mini: "EP",
        component: Timeline,
        layout: "/admin",
      },
    ],
  },
];

export default routes;