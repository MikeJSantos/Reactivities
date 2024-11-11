import { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity: _deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");
  function deleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    _deleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group>
        {activities.map((a) => (
          <Item key={a.id}>
            <Item.Content>
              <Item.Header as="a">{a.title}</Item.Header>
              <Item.Meta>{a.date}</Item.Meta>
              <Item.Description>
                <div>{a.description}</div>
                <div>
                  {a.city}, {a.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(a.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={a.id}
                  loading={submitting && target === a.id}
                  onClick={(e) => deleteActivity(e, a.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={a.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
