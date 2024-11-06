import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";

function App() {
  const url = "http://localhost:5000/api/activities";
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>(url).then((response) => {
      setActivities(response.data);
    });
  }, [activities]);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <List>
          {activities.map((a) => (
            <List.Item key={a.id}>{a.title}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
