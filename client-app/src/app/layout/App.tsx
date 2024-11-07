import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";

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
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default App;
