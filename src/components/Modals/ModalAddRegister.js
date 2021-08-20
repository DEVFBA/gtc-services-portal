import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter
} from "reactstrap";

function ModalAddRegister(props) {
  //Descargar la lista de usuarios, posteriormente se le va a pasar como PROP a la ReactTable
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
  }, []);

  function addRecord(event) {
    //Código para añadir un registro a la tabla
    //EndPoint CREATE

    //una vez que añadimos el nuevo usuario, vamos a actualizar la tabla
    //updateUsers();
  }

  function updateUsers(){
    //A la hora de crear un nuevo usuario necesitamos actualizar la tabla para que
    //se pinten todos los usuarios incluido el nuevo
    //Hacemos fetch nuevamente a todos los usuarios
    //setUsers(nuevadata )
  }


  return (
    <>
        <Modal isOpen={props.isOpen} toggle={this.toggleModalDemo}>
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModalDemo}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Modal Title</h5>
            </div>
            <ModalBody>
                <p>Woohoo, you're reading this text in a modal!</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggleModalDemo}>
                    Close
                </Button>
                <Button color="primary">
                    Save changes
                </Button>
            </ModalFooter>
        </Modal>
    </>
  );
}

export default ModalAddRegister;