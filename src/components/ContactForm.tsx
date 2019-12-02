import React, { FC, useState } from 'react';

import {
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  makeStyles,
  Theme,
  createStyles,
  Box,
} from '@material-ui/core';
import { Formik } from 'formik';
import PersonalForm from './forms/PersonalForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 5fr',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepper: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    steps: {
      marginBottom: theme.spacing(1.5),
    },
  }),
);

const ContactForm: FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    'Select campaign settings',
    'Create an ad group',
    'Create an ad',
  ];

  const ButtonBar = () => (
    <Box>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        className={classes.button}
      >
        Back
      </Button>
      {isStepOptional(activeStep) && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSkip}
          className={classes.button}
        >
          Skip
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phones, setPhones] = useState(['']);
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Formik
              initialValues={{ name, email, phones }}
              onSubmit={({ name, email, phones }) => {
                setName(name);
                setEmail(email);
                setPhones(phones);
                handleNext();
              }}
            >
              {({ values }) => (
                <PersonalForm values={values}>
                  <ButtonBar />
                </PersonalForm>
              )}
            </Formik>
          </>
        );
      case 1:
        return <ButtonBar />;
      case 2:
        return <ButtonBar />;
      default:
        return (
          <Box>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Box>
        );
    }
  };
  return (
    <Box className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        alternativeLabel
        connector={null}
        className={classes.stepper}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps} className={classes.steps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box>{getStepContent(activeStep)}</Box>
    </Box>
  );
};

export default ContactForm;
