import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  deselectActivity: () => void;
  openForm: (id: string) => void;
}

export function ActivityDetails({
  activity,
  deselectActivity,
  openForm,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(activity.id)}
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
