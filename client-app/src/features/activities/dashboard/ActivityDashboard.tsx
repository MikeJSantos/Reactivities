import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  deselectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  deselectActivity,
  editMode,
  openForm,
  closeForm,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} onClick={selectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            deselectActivity={deselectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm activity={selectedActivity} closeForm={closeForm} />
        )}
      </Grid.Column>
    </Grid>
  );
}
