import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  var initialValues = {
    displayName: "",
    userName: "",
    email: "",
    password: "",
    error: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => setErrors({ error: "Invalid email/password" }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Register" color="teal" textAlign="center" />
          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextInput placeholder="User Name" name="userName" />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
