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
    Label
} from "reactstrap";

function ModalReadBillTos({modalReadRecord, setModalReadRecord, record}) {
        // register form
    const [customer, setCustomer] = React.useState({});
    const [entityType, setEntityType] = useState({})
    const [taxId, setTaxId] = useState("")
    const [name, setName] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [country, setCountry] = useState({})
    const [foreignTaxId, setForeignTaxId] = useState("")
    const [taxRegimen, setTaxRegimen] = useState({})
    const [CFDIUse, setCFDIUse] = useState({})

    useEffect(() => {
        setCustomer(record.customer);
        setEntityType(record.entityType);
        setTaxId(record.taxId);
        setName(record.name);
        setZipCode(record.zipCode);
        setCountry(record.country);
        setForeignTaxId(record.foreignTaxId);
        setTaxRegimen(record.idTaxRegimen + " - " + record.taxRegimen);
        setCFDIUse(record.idCFDIUse + " - " + record.CFDIUse)
    },[record]);

    const handleModalClick = () => {
        setModalReadRecord(!modalReadRecord);
    };

    return (
        <Modal isOpen={modalReadRecord} toggle={handleModalClick} size="lg" aria-labelledby="contained-modal-title-vcenter">
           <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Ver Detalle Cliente - Receptor Factura</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <FormGroup>
                    <Label for="exampleSelect">Cliente</Label>
                    <Input
                        name="customer"
                        type="text"
                        autoComplete="off"
                        value={customer}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">RFC</Label>
                    <Input
                        name="taxid"
                        type="text"
                        autoComplete="off"
                        value={taxId}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Nombre / Razón Social:</Label>
                    <Input
                        name="name"
                        type="text"
                        autoComplete="off"
                        value={name}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Código Postal</Label>
                    <Input
                        name="zipcode"
                        type="text"
                        autoComplete="off"
                        value={zipCode}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">País</Label>
                    <Input
                        name="country"
                        type="text"
                        autoComplete="off"
                        value={country}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Id. Tributario</Label>
                    <Input
                        name="foreigntaxid"
                        type="text"
                        autoComplete="off"
                        value={foreignTaxId}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Regimen Fiscal</Label>
                    <Input
                        name="taxregimen"
                        type="text"
                        autoComplete="off"
                        value={taxRegimen}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Uso CFDI</Label>
                    <Input
                        name="taxregimen"
                        type="text"
                        autoComplete="off"
                        value={CFDIUse}
                        readOnly
                    />
                </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                    <Button className="buttons button-close btn-gtc" color="secondary" onClick={handleModalClick}>
                        Cerrar
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalReadBillTos;