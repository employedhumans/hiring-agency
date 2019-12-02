import React, { FC } from 'react';
import { useField, Form, FieldArray } from 'formik';
import {
  FormControl,
  InputLabel,
  Input,
  Box,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import CustomField from './CustomField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addIcon: {
      width: '60%',
      textAlign: 'center',
    },
    removeIcon: {
      marginLeft: theme.spacing(1),
    },
  }),
);

type Prop = {
  values: {
    name: string;
    email: string;
    phones: string[];
  };
};

const PersonalForm: FC<Prop> = ({ values, children }) => {
  const classes = useStyles();
  return (
    <Form>
      <CustomField label="name" type="text" name="name" />
      <CustomField label="email" type="email" name="email" />
      <FieldArray
        name="phones"
        render={helper => (
          <Box>
            <Box>
              {values.phones.map((_, i) => (
                <Box key={i}>
                  <CustomField
                    label={`phone ${i + 1}`}
                    type="tel"
                    name={`phones.${i}`}
                  />
                  {i !== 0 && (
                    <IconButton
                      onClick={() => helper.remove(i)}
                      size="medium"
                      className={classes.removeIcon}
                    >
                      <MdRemoveCircleOutline />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
            <Box className={classes.addIcon}>
              <IconButton onClick={() => helper.push('')} size="medium">
                <Typography>
                  Add alternate number <MdAddCircleOutline />
                </Typography>
              </IconButton>
            </Box>
          </Box>
        )}
      />
      {children}
    </Form>
  );
};

export default PersonalForm;
