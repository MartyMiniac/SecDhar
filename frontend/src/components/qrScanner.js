import { useState } from "react";
import { useZxing } from "react-zxing";
import {Box, Button} from '@mui/material';

const QrcodeScanner = () => {
    const [result, setResult] = useState("");
    const [paused, setPaused] = useState(false);

    const {
        ref,
        torch: {
            on: torchOn,
            off: torchOff,
            isOn: isTorchOn,
            isAvailable: isTorchAvailable,
        },
    } = useZxing({
        paused,
        onResult(result) {
            setResult(result.getText());
        },
    });

    return (
        <>
            <video ref={ref} style={{width:'100%'}}/>
            <p>
                <span>Result:</span>
                <span>{result}</span>
            </p>
            <Box sx={{ '& button': { m: 1 } }}>
                <Button size="small" variant="outlined" onClick={() => setPaused(!paused)}>
                    {paused ? "Resume" : "Stop Scan"}
                </Button>
                <Button size="small" variant="outlined"
                    onClick={() => {
                        if (isTorchOn) {
                            torchOff();
                        } else {
                            torchOn();
                        }
                    }}
                    disabled={!isTorchAvailable}
                >
                    {isTorchOn ? "Disable" : "Enable"} torch
                </Button>
            </Box>
        </>
    );
};
export default QrcodeScanner