import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { DatePickerProps } from "react-datepicker";

export default function MyDateInput(props: DatePickerProps) {
  const [field, meta, helpers] = useField(props.name!);
  const { touched, error } = meta;
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(date: any) => helpers.setValue(date)}
      />
      {touched && error ? (
        <Label basic color="red">
          {error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
