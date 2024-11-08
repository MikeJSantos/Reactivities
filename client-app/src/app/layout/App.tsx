import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  const url = "http://localhost:5000/api/activities";
  useEffect(() => {
    axios.get<Activity[]>(url).then((response) => {
      setActivities(response.data);
    });
  }, []);

  function selectActivity(id: string) {
    setSelectedActivity(activities.find((a) => a.id == id));
  }

  function deselectActivity() {
    setSelectedActivity(undefined);
  }

  function openForm(id?: string) {
    id ? selectActivity(id!) : deselectActivity();
    setEditMode(true);
  }

  function closeForm() {
    setEditMode(false);
  }

  function createOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    <>
      <NavBar openForm={openForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
          deselectActivity={deselectActivity}
          editMode={editMode}
          openForm={openForm}
          closeForm={closeForm}
          createOrEditActivity={createOrEditActivity}
        />
      </Container>
    </>
  );
}

export default App;
