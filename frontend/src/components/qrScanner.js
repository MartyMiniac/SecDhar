import { useState } from "react";
import { useZxing } from "react-zxing";
import {Box, Button} from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import PauseIcon from '@mui/icons-material/Pause'; 
import ReplayIcon from '@mui/icons-material/Replay';

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
                    {paused ? <ReplayIcon /> : <PauseIcon />}
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
                    {isTorchOn ? <FlashOffIcon /> : <FlashOnIcon />}
                </Button>
            </Box>
        </>
    );
};
export default QrcodeScanner