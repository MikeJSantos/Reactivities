import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity, openForm, deselectActivity } = activityStore;
  if (!selectedActivity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
      <CardContent>
        <CardHeader>{selectedActivity.title}</CardHeader>
        <CardMeta>
          <span>{selectedActivity.date}</span>
        </CardMeta>
        <CardDescription>{selectedActivity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(selectedActivity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Close"
            onClick={() => deselectActivity()}
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
}
