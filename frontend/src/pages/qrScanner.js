import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Box from '@mui/material/Box';

const Test = (props) => {
    const [data, setData] = useState('No result');

    return (
        <>
            <Box sx={{ width: 300, border: '1px dashed grey' }}>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            setData(result?.text);
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                />
            </Box>
            <p>{data}</p>
        </>
    );
};

export default Test