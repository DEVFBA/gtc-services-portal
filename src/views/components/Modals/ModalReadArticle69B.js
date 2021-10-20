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
    Col,
} from "reactstrap";

function ModalReadArticle69B({abierto, toggleModalUpdateRecord, record}) {
    /*useEffect(() => {
        setupdateIdCustomer(record.idCus)
        setupdateFullName(record.nombre)
        setupdateRfc(record.taxId)
        setupdateStreet(record.street)
        setupdateNoExterior(record.exteriorNumber)
        setupdateNoInterior(record.interiorNumber)
        setupdateCountry({
            value: record.idCountry,
            label: record.country
        })
        setupdateCity(record.city)
        setupdateZipCode(record.zipCode)
        setupdateContact(record.contact)
        setupdateTelephone1(record.phone1)
        setupdateTelephone2(record.phone2)
        setupdateWebPage(record.webPage)
        if(record.status === "Habilitado")
        {
            setupdateStatus(true);
        }
        else{
            setupdateStatus(false);
        }
        setupdateLogo(record.logo)
    },[record]);*/

    const handleModalClick = () => {
        toggleModalUpdateRecord(!abierto);
    };

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Ver registro</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>RFC</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.rfc}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre del Contribuyente</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.contribuyente}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Situación del Contribuyente</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.situacionContribuyente}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Presunción SAT</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.publicacionPresuntosSAT}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación Página SAT Presuntos</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.fechaPresuncionSAT}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Presunción DOF</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.fechaOficioSAT}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación DOF Presuntos</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.numFechaDesvirtuados}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Contribuyentes Desvirtuados SAT</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.numFechaDesvirtuados}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación Página SAT Desvirtuados</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.pubSATDesvirtuados}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Desvirtuados DOF</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.numFechaDesvirtuadosDOF}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación DOF Desvirtuados</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.pDOFDesvirtuados}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Definitivos SAT</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.numFechaDefinitivos}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación Página SAT Definitivos</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.pubDefinitivos}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Definitivos DOF</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.numFechaDefinitivosDOF}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación DOF Definitivos</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.pDOFDefinitivos}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Sentencia Favorable SAT</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.numFechaSentencia}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación Página SAT Sentencia Favorable</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.pSentencia}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Número y Fecha Oficio Global Sentencia Favorable DOF</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.numFechaSentenciaDOF}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Publicación DOF Sentencia Favorable</label>
                            <Input
                                name="rfc"
                                type="text"
                                value = {record.pSentenciaDOF}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                <Button className="buttons" color="secondary" onClick={handleModalClick}>
                    Cerrar
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalReadArticle69B;