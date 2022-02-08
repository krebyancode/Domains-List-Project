import React, { useState, useContext, useEffect } from "react";
import { db } from "../helpers/firebase";
import {
  collection,
  query,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Grid, Segment, Button } from "semantic-ui-react";

const AddDomain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [url, setUrl] = useState("");
  const [provider, setProvider] = useState("");
  const [expiration, setExpiration] = useState("");

  useEffect(() => {
    if (state) {
      setProvider(state.sortedList[state.index].provider);
      setUrl(state.sortedList[state.index].url);
      setExpiration(state.sortedList[state.index].expiration);
    }
  }, [state]);

  const colRef = collection(db, "domains");

  const q = query(colRef, orderBy("createdAt"));

  const addDomain = () => {
    if (!state) {
      addDoc(colRef, {
        url,
        provider,
        expiration,
        createdAt: serverTimestamp(),
      }).then(() => {
        navigate("/view");
      });
    } else {
      const docRef = doc(db, "domains", state.sortedList[state.index].id);
      updateDoc(docRef, {
        url,
        provider,
        expiration,
        createdAt: serverTimestamp(),
      }).then(() => {
        setUrl("");
        setProvider("");
        setExpiration("");
        navigate("/view");
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDomain();
    setUrl("");
    setProvider("");
    setExpiration("");
  };

  return (
    <div className="main">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 300 }}>
          <h2 className="contact-header" style={{ color: "black" }}>
            Add New Domain
          </h2>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="url"
                icon="world"
                iconPosition="left"
                placeholder="Url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Form.Input
                fluid
                name="provider"
                icon="user"
                iconPosition="left"
                placeholder="Provider"
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                required
              />
              <Form.Input
                fluid
                name="expiration"
                icon="time"
                iconPosition="left"
                placeholder="Expiration Date"
                type="date"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                required
              />

              <Button color="teal" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AddDomain;
