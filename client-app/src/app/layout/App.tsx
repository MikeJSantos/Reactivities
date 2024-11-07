import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const url = "http://localhost:5000/api/activities";
  useEffect(() => {
    axios.get<Activity[]>(url).then((response) => {
      setActivities(response.data);
    });
  }, [activities]);

  function selectActivity(id: string) {
    setSelectedActivity(activities.find((a) => a.id == id));
  }

  function selectActivity_cancel() {
    setSelectedActivity(undefined);
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
          selectActivity_cancel={selectActivity_cancel}
        />
      </Container>
    </>
  );
}

export default App;
