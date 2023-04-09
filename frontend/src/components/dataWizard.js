import * as React from 'react';
import { Box, Button, MobileStepper } from '@mui/material';
import QrcodeScanner from "./qrScanner";
import QrcodeGenerator from "./qrGenerator";
const requestSteps = [<QrcodeScanner />, <QrcodeGenerator />];
const sendSteps = [<QrcodeGenerator />, <QrcodeScanner />];

export default function DataWizard(props) {

    let steps = []
    if(props.steptype === "request"){
        steps = []
        steps = [... requestSteps]
    }
        
    if(props.steptype === "send"){
        steps = []
        steps = [... sendSteps]
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (

        <Box >
            <Box> {steps[activeStep]} </Box>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </Button>
                }
            />
        </Box>
    );
}