import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MobileStepper from '@mui/material/MobileStepper';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';

// import cont from './../../images/cont.jpg';
// import log from './../../images/log.jpg';
// import reg from './../../images/reg.jpg';

import css from './Home.module.css'
import { Link } from 'react-router-dom';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


// const images = [
//   {
//     label: 'Fast to signup',
//     imgPath:
//       reg,
//   },
//   {
//     label: 'Quick to login',
//     imgPath:
//       log,
//   },
//   {
//     label: 'Easy to use',
//     imgPath:
//       cont,
//   },
// ];

export const HomePage = () => {
  // const theme = useTheme();
  // const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = images.length;

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStepChange = (step) => {
  //   setActiveStep(step);
  // };

  return (
    <div className={css.Wrap}>
<Typography variant="h3" textAlign="center" style={{ color: '#1976d2' }}>
  Welcome to Phone book
</Typography>

<Typography variant="h4" textAlign="center" fontFamily="Dancing Script" style={{ color: '#1976d2' }}>
  fast to join, easy to use
</Typography>

    {/* <Box sx={{ maxWidth: 550, flexGrow: 1, margin: "0 auto"}}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>



      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 300,
                  display: 'block',
                  maxWidth: 550,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>



      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box> */}



<Typography variant="h6" textAlign="center" style={{ color: '#1976d2' }}>
  Wanna try? Just <Link to="/registration">sign up</Link>
</Typography>
<Typography variant="h6" textAlign="center" style={{ color: '#1976d2' }}>
  Already with us? Just <Link to="/login">login</Link>
</Typography>
</div>
  );
}

// export default HomePage;