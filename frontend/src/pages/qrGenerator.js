import QRCode from 'qrcode'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import axios from "axios";

function Qrcode() {
    const [data, setData] = useState('')
    const [qr, setQr] = useState('')
    const fetchData = () => {
        return axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => setData(response.data[1].name));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const GenerateQRCode = () => {
        QRCode.toDataURL(data, {
            width: 100,
            margin: 2,
        }, (err, data) => {
            if (err) return console.error(err)
            // console.log(data)
            setQr(data)
        })
    }
    return (
        <>
            <Button variant="contained" onClick={GenerateQRCode}>Generate</Button>
            {<img src={qr} alt='' />}
        </>
    )
}
export default Qrcode