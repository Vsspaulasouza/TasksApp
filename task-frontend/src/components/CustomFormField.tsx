import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import { capitalize } from "../utils";

interface CustomFormFieldProps {
  fieldName: string;
  error: undefined | string;
  isTouched: undefined | boolean;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
}

export function CustomFormField({
  fieldName,
  error,
  isTouched,
  label,
  type,
}: CustomFormFieldProps) {
  const fieldLabel = label ?? capitalize(fieldName);

  return (
    <FormControl isInvalid={error !== undefined && isTouched}>
      <FormLabel htmlFor={fieldName} fontWeight="bold">
        {fieldLabel}
      </FormLabel>
      <Field as={Input} id={fieldName} name={fieldName} type={type} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
