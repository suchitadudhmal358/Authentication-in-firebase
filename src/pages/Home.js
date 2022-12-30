import React, { useContext, useState } from "react";
import { Container, Row, Col, Input, Button, InputGroup } from "reactstrap";
import Axios from "axios";

//components
import { UserContext } from "../context/UserContext";
import UserCard from "../Components/UserCard";
import Repos from "../Components/Repos";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

const Home = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const fetchDetails = async () => {
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      console.log(data);
      setUser(data);
    } catch (error) {
      toast("Not able to locate Use", { type: "error" });
    }
  };

  if (!context.user?.uid) {
    return navigate("/signin");
  }
  return (
    <Container>
      <Row className="mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              placeholder="please provide the username "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={fetchDetails} color="primary">
              Fetch User
            </Button>
          </InputGroup>
          {user ? <UserCard user={user} /> : null}
        </Col>
        <Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
};

export default Home;
