import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
}

export function ActivityForm({ activity, closeForm }: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title">{activity?.title ?? ""}</Form.Input>
        <Form.TextArea placeholder="Description">
          {activity?.description ?? ""}
        </Form.TextArea>
        <Form.Input placeholder="Category">
          {activity?.category ?? ""}
        </Form.Input>
        <Form.Input placeholder="Date">{activity?.date ?? ""}</Form.Input>
        <Form.Input placeholder="City">{activity?.city ?? ""}</Form.Input>
        <Form.Input placeholder="Venue">{activity?.venue ?? ""}</Form.Input>
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
