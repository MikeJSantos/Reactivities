import { Button, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field } from "formik";

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
  const navigate = useNavigate();
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
  // function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const { name, value } = e.target;
  //   setActivity({ ...activity, [name]: value });
  // }
  // function submit() {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   } else updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  // }

  if (initialLoading) return <LoadingComponent content="Loading activity" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize={true}
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field name="title" placeholder="Title" />
            <Field name="description" placeholder="Description" />
            <Field name="category" placeholder="Category" />
            <Field name="date" placeholder="Date" type="date" />
            <Field name="city" placeholder="City" />
            <Field name="venue" placeholder="Venue" />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
