import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  // TODO: destructure objects on useStore() call
  const { initialLoading, loadActivities, map } = activityStore;

  useEffect(() => {
    // edge case: navigating to /manage/:id, then hitting Cancel loads only 1 activity
    if (map.size <= 1) loadActivities();
  }, [map.size, loadActivities]);

  if (initialLoading) return <LoadingComponent content="Loading activities" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
