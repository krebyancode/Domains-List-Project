import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { Dimmer, Loader, Table, Button } from "semantic-ui-react";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { AuthContext } from "../context/AuthContext";

let today = new Date().toISOString().split("T")[0];

const Main = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { domainInfo, getDomains, isLoading } = useContext(BlogContext);
  const [sortedList, setSortedList] = useState(domainInfo);

  const userSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getDomains();
  }, []);

  const filterList = () => {
    setSortedList(
      domainInfo.filter(
        (item) =>
          new Date(item.expiration) / (1000 * 60 * 60 * 24) - 15 <
          new Date(today) / (1000 * 60 * 60 * 24)
      )
    );
  };

  useEffect(() => {
    filterList();
  }, [getDomains]);

  return (
    <div className="container">
      <Button onClick={() => navigate("/login")} content="Login" primary />
      {currentUser && (
        <Button onClick={userSignOut} content="Logout" secondary />
      )}

      <h2>WARNING!.. Expiration is coming for the domains below</h2>
      {isLoading ? (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      ) : (
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Url</Table.HeaderCell>
              <Table.HeaderCell>Provider</Table.HeaderCell>
              <Table.HeaderCell>Expiration Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedList.map((card, index) => (
              <Table.Row
                key={card.id}
                style={{ cursor: "pointer" }}
                className="red"
              >
                <Table.Cell>{card.url}</Table.Cell>
                <Table.Cell>{card.provider}</Table.Cell>
                <Table.Cell>{card.expiration}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {currentUser && (
        <>
          <Button
            onClick={() => navigate("/add")}
            content="Add Domain"
            primary
          />
          <Button
            onClick={() => navigate("/view")}
            content="View Domains"
            secondary
          />
        </>
      )}
    </div>
  );
};

export default Main;
