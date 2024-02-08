import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { type Property } from "csstype";
import { Field } from "formik";
import { capitalize } from "../utils";

interface CustomFormFieldProps {
  fieldName: string;
  error: undefined | string;
  isTouched: undefined | boolean;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  padding?: Property.Padding;
  width?: Property.Width;
  cursor?: Property.Cursor;
  color?: Property.Color;
}

export function CustomFormField({
  fieldName,
  error,
  isTouched,
  label,
  type,
  padding,
  width,
  cursor,
  color,
}: CustomFormFieldProps) {
  const fieldLabel = label ?? capitalize(fieldName);

  return (
    <FormControl isInvalid={error !== undefined && isTouched}>
      <FormLabel htmlFor={fieldName} fontWeight="bold" color={color}>
        {fieldLabel}
      </FormLabel>
      <Field
        as={Input}
        id={fieldName}
        name={fieldName}
        type={type}
        padding={padding}
        width={width}
        cursor={cursor}
        color={color}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
