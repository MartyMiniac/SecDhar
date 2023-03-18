import QRCode from "qrcode";
import { useState } from "react";
import { Button } from "@mui/material";
import { qrData } from "../services.js/data";

function QrcodeGenerator() {
  const [qr, setQr] = useState("");
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      qrData,
      {
        width: 200,
        margin: 2,
      },
      (err, data) => {
        if (err) return console.error(err);
        setQr(data);
      }
    );
  };
  if (qr)
    return (
      <>
        {/* <Button variant="contained" onClick={GenerateQRCode}>
        Click here
      </Button> */}
        {<img src={qr} alt="" />}
      </>
    );
  else
    return (
      <>
        <Button variant="contained" onClick={GenerateQRCode}>
          Generate
        </Button>
        {<img src={qr} alt="" />}
      </>
    );
}
export default QrcodeGenerator;
