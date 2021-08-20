/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const logged = localStorage.getItem("logged");
  

  useEffect(() => {
    //Si el usuario ya ha iniciado sesión que se le redirija al dashboard
    //Por el momento se usará la bandera logged
    if(logged==="true")
    {
      history.push("/admin/dashboard");
      return;
    }
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onSubmitForm(event) {
    event.preventDefault();

    const credentials = { email, password };

    //Aquí se hará el fetch a la API 
    //Por el momento se va a guardar en el local storage una bandera para simular el token
    localStorage.setItem("logged", true);

    //Vamos a tener 3 tipos de usuario, dependiendo cual sea se les van a mostrar cosas diferentes en la aplicación
    //Por el momento guardaremos el tipo de usuario en el localstorage, pero eso se tiene que saber en la aplicación de usuario que va "abrazar" todo el sitio una vez que se haya loggeado
    localStorage.setItem("tipo", "administrador")
    
    history.push("/admin/dashboard");
  }

  return (
    <div className="login-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form" onSubmit={onSubmitForm} >
              <Card className="card-login">
                <CardHeader>
                  <CardHeader>
                    <h3 className="header text-center">Iniciar Sesión</h3>
                  </CardHeader>
                </CardHeader>
                <CardBody>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type = "email"
                      name = "email"
                      placeholder="Email"
                      onChange={onChangeEmail} />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      autoComplete="off"
                      onChange={onChangePassword}
                    />
                  </InputGroup>
                  <br />
{/*                   <FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input defaultChecked defaultValue="" type="checkbox" />
                        <span className="form-check-sign" />
                        Subscribe to newsletter
                      </Label>
                    </FormGroup>
                  </FormGroup> */}
                </CardBody>
                <CardFooter>
                  <div className="btn-login">
                    <Button type="submit" className="btn-round mb-3" color="warning">
                      Iniciar Sesión
                    </Button>
                  </div>
                </CardFooter>
                <Link className="need-account" to="/">
                    ¿Olvidaste tu contraseña?
                </Link>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${
            require("assets/img/logo-gtc.jpg").default
          })`,
        }}
      />
    </div>
  );
}

export default Login;
