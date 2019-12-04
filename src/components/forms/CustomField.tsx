import React, { FC } from 'react';

import { useField } from 'formik';

import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

const CustomField: FC<{
  type: string;
  label: string;
  name: string;
  required?: boolean;
}> = ({ label, ...prop }) => {
  const [field, meta] = useField(prop as any);
  return (
    <FormControl>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Input
        id={label}
        aria-describedby="my-helper-text"
        {...field}
        {...prop}
      />
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CustomField;
