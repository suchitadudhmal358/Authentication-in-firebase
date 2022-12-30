import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Row,
  Input,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
      })
      .catch((error) => {
        toast(error.message, { type: error });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  {
    if (context.user?.uid) {
      return navigate("/");
    }
    return (
      <Container className="text-center">
        <Row>
          <Col lg={6} className="offset-lg-3 mt-5">
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardHeader className="">SignIn</CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="email" sm={3}>
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="Provide your email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="password" sm={3}>
                      Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" block color="primary">
                    Sign In
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Signin;
