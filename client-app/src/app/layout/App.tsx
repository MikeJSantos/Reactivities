import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

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
    setSubmitting(true);

    function updateState() {
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    }

    if (activity.id) {
      agent.Activities.update(activity)
        .then(() => {
          setActivities([
            ...activities.filter((a) => a.id !== activity.id),
            activity,
          ]);
        })
        .then(updateState);
    } else {
      activity.id = uuid();
      agent.Activities.create(activity)
        .then(() => {
          setActivities([...activities, activity]);
        })
        .then(updateState);
    }
  }

  function deleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
      setSubmitting(false);
    });
  }

  if (activityStore.initialLoading)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar openForm={openForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
          deselectActivity={deselectActivity}
          editMode={editMode}
          openForm={openForm}
          closeForm={closeForm}
          createOrEditActivity={createOrEditActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
