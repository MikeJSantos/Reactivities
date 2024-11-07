import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  activities: Activity[];
  onClick: (id: string) => void;
}

export default function ActivityList({ activities, onClick }: Props) {
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
                  onClick={() => onClick(a.id)}
                  floated="right"
                  content="View"
                  color="blue"
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
