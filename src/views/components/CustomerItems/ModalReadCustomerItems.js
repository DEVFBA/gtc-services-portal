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
    Row,
    Col
} from "reactstrap";

function ModalReadCustomerItems({modalReadRecord, setModalReadRecord, record}) {
    
    const [customer, setCustomer] = React.useState("");
    const [idItem, setIdItem] = useState("");
    const [productServiceCode, setProductServiceCode] = useState("");
    const [idUoMCode, setIdUoMCode] = useState("");
    const [idCustomerUoM, setIdCustomerUoM] = useState("");
    const [customerUoMsCode, setCustomerUoMsCode] = useState("");
    const [UoMCode, setUoMCode] = useState("");
    const [taxObject, setTaxObject] = useState("");
    const [harmonizedTariffCode, setHarmonizedTariffCode] = useState("");
    const [idCustomUoMs, setIdCustomUoMs] = useState("");
    const [branch, setBranch] = useState("");
    const [model, setModel] = useState("");
    const [subModel, setSubModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");

    useEffect(() => {
        setCustomer(record.customer);
        setIdItem(record.idItem);
        setProductServiceCode(record.idProductServiceCode + " - " + record.productServiceCode);
        setIdUoMCode(record.idUoMCode);
        setIdCustomerUoM(record.country);
        setCustomerUoMsCode("");
        setUoMCode(record.UoMCode);
        setTaxObject(record.taxObject);
        setHarmonizedTariffCode(record.harmonizedTariffCode);
        setIdCustomUoMs(record.idCustomUoMs);
        setBranch(record.branch);
        setModel(record.model);
        setSubModel(record.subModel);
        setSerialNumber(record.serialNumber)
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
                <h5 className="modal-title">Ver detalle Cliente - Artículo</h5>
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
                    <Label for="exampleSelect">Número de Item</Label>
                    <Input
                        name="iditem"
                        type="text"
                        autoComplete="off"
                        value={idItem}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Clave Producto Servicio</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={productServiceCode}
                        readOnly
                    />
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="exampleSelect">Clave Unidad Medida</Label>
                            <Input
                                name="iduomcode"
                                type="text"
                                autoComplete="off"
                                value={idUoMCode}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="exampleSelect">Unidad Medida Interna</Label>
                            <Input
                                name="country"
                                type="text"
                                autoComplete="off"
                                value={"FALTA DATO"}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="exampleSelect">Descripción Unidad Medida</Label>
                            <Input
                                name="foreigntaxid"
                                type="text"
                                autoComplete="off"
                                value={UoMCode}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleSelect">Objeto Impuesto</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={taxObject}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Fracción Arancelaria</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={harmonizedTariffCode}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Clave Unidad Aduana</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={idCustomUoMs}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Marca</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={branch}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Modelo</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={model}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">SubModelo</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={subModel}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Número de Serie</Label>
                    <Input
                        name="productservicecode"
                        type="text"
                        autoComplete="off"
                        value={serialNumber}
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

export default ModalReadCustomerItems;