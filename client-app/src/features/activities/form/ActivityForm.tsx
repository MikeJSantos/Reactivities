import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    initialLoading,
  } = activityStore;
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });
  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);
  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  }
  function submit() {
    activity.id === "" ? createActivity(activity) : updateActivity(activity);
  }

  if (initialLoading) return <LoadingComponent content="Loading activity" />;

  return (
    <Segment clearing>
      <Form onSubmit={submit} autoComplete="off">
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
          name="date"
          value={activity.date}
          onChange={onChange}
          placeholder="Date"
          type="date"
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
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
