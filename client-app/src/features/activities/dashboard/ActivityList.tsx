import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
  const { activityStore } = useStore();

  return (
    <Segment>
      <Item.Group>
        {activityStore.activitiesByDate.map((a) => (
          <ActivityListItem key={a.id} activity={a} />
        ))}
      </Item.Group>
    </Segment>
  );
});
