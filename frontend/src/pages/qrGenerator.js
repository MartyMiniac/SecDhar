import QRCode from 'qrcode'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'

function Qrcode() {
    const [data, setData] = useState('')
    const [qr, setQr] = useState('')
    const fetchData = () => {
        return fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setData(data[0].name));
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