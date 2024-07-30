import Dashboard from "views/Dashboard.js";
import ListUser from "./views/User/ListContact";
import TambahUser from "./views/User/TambahContact";
import EditUser from "./views/User/EditContact";
import EditContact from "./views/User/EditContact";
import ListContact from "./views/User/ListContact";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
    sideBar:true
  },
  

  {
    path: "/contact",
    name: "List Contact",
    icon: "nc-icon nc-world-2",
    component: <ListContact />,
    layout: "/admin",
    sideBar:true
  },
  {
    path: "/contact/tambah",
    name: "Tambah User",
    icon: "nc-icon nc-world-2",
    component: <TambahUser />,
    layout: "/admin",
    sideBar:false
  },
  {
    path:"/edit-contact/:id",
    name:"edit User",
    component: <EditContact/>,
    layout:"/admin",
    sideBar:false,
    children:<EditContact/>   
  },

];
export default routes;

