import { useState } from "react";
import { useZxing } from "react-zxing";

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
                <span>Last result:</span>
                <span>{result}</span>
            </p>
            <div>
                <button onClick={() => setPaused(!paused)}>
                    {paused ? "Resume" : "Stop Scan"}
                </button>
                <button
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
                </button>
            </div>
        </>
    );
};
export default QrcodeScanner