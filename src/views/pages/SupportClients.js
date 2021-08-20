import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";

import ReactTables from "views/tables/ReactTables.js"; 

function Users() {
  return (
    <>
      <div className="content">
        <div className="header text-center">
          <h3 className="title">Users Catalog</h3>
        </div>
        <ReactTables example = {"Hola"}/>
      </div>
    </>
  );
}

export default Users;