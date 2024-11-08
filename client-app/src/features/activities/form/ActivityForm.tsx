import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
}

export function ActivityForm({
  activity: _activity,
  closeForm,
  createOrEditActivity,
}: Props) {
  const initialState = _activity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initialState);
  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={() => createOrEditActivity(activity)} autoComplete="off">
        <Form.Input
          name="title"
          value={activity.title}
          onChange={onChange}
          placeholder="Title"
        />
        <Form.TextArea
          name="description"
          value={activity.description}
          onChange={onChange}
          placeholder="Description"
        />
        <Form.Input
          name="category"
          value={activity.category}
          onChange={onChange}
          placeholder="Category"
        />
        <Form.Input
          name="Date"
          value={activity.date}
          onChange={onChange}
          placeholder="Date"
        />
        <Form.Input
          name="city"
          value={activity.city}
          onChange={onChange}
          placeholder="City"
        />
        <Form.Input
          name="venue"
          value={activity.venue}
          onChange={onChange}
          placeholder="Venue"
        />
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
