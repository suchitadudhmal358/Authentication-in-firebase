import React from "react";
import { Card, CardBody } from "reactstrap";

const UserCard = ({ user }) => {
  return (
    <Card className="mt-3 mb-4 text-center">
      <img src={user.avatar_url} className="img-thumbnail" />
      <CardBody>
        <div className="text-primary">{user.name}</div>
        <div className="text-primary">{user.location}</div>
        <div className="text-info">{user.blog}</div>
        <div className="text-primary">
          Available for hire : {user.hireable ? "YES" : "NO"}
        </div>
        <div className="text-primary">Followers : {user.followers}</div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
