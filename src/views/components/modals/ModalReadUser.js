import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Button,
    Modal, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Form,
    Input,
    Label,
} from "reactstrap";

function ModalReadUser({abierto, toggleModalReadRecord}) {
    //Descargar la información del registro a leer
    const [record, setRecord] = useState([]);

    useEffect(() => {
        //Aqui vamos a descargar la información del registro (se utilizará id como props)
    }, []);

    const handleModalClick = () => {
        toggleModalReadRecord(!abierto);
    };

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Record Detail</h5>
            </div>
            <ModalBody>
                <p>Woohoo, you're reading this text in a modal!</p>
            </ModalBody>
            <ModalFooter>
            <div className="center-side">
                <Button color="secondary" onClick={handleModalClick}>
                    Close
                </Button>
            </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalReadUser;