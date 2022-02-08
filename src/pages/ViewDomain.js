import React, { useState, useContext, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import { Dimmer, Loader, Table, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../helpers/firebase";
import { doc, deleteDoc } from "firebase/firestore";

let today = new Date().toISOString().split("T")[0];

const ViewDomain = () => {
  const navigate = useNavigate();
  const { domainInfo, getDomains, isLoading } = useContext(BlogContext);
  const [sortedList, setSortedList] = useState(domainInfo);

  useEffect(() => {
    getDomains();
  }, []);

  const deleteDomain = (id) => {
    const docRef = doc(db, "domains", id);
    deleteDoc(docRef).then(() => {
      getDomains();
    });
  };

  const sortList = () => {
    const copyList = [...domainInfo];
    setSortedList(
      copyList.sort((a, b) => {
        if (a["expiration"] < b["expiration"]) {
          return -1;
        }
        if (a["expiration"] > b["expiration"]) {
          return 1;
        }
      })
    );
  };

  useEffect(() => {
    sortList();
  }, [getDomains]);

  return (
    <div className="main">
      <h2>View Domains</h2>
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
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedList.map((card, index) => (
              <Table.Row
                key={card.id}
                style={{ cursor: "pointer" }}
                className={
                  (new Date(card.expiration) - new Date(today)) /
                    (1000 * 60 * 60 * 24) <
                  15
                    ? "red"
                    : (new Date(card.expiration) - new Date(today)) /
                        (1000 * 60 * 60 * 24) <
                      60
                    ? "orange"
                    : (new Date(card.expiration) - new Date(today)) /
                        (1000 * 60 * 60 * 24) <
                      100
                    ? "green"
                    : null
                }
              >
                <Table.Cell>{card.url}</Table.Cell>
                <Table.Cell>{card.provider}</Table.Cell>
                <Table.Cell>{card.expiration}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() =>
                      navigate(`/add`, { state: { sortedList, index } })
                    }
                    content="Edit"
                    primary
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => deleteDomain(card.id)}
                    content="Delete"
                    secondary
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default ViewDomain;
