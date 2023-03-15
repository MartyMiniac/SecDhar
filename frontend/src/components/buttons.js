import { Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import QrcodeScanner from './qrScanner';
import QrcodeGenerator from './qrGenerator'

const Buttons = () => {
    const [openScanner, setOpenScanner] = useState(false);
    const [openGenerate, setOpenGenerate] = useState(false);

    const handleOpenScanner = () => {
        setOpenScanner(true);
    };
    const handleOpenGenerate = () => {
        setOpenGenerate(true);
    };
    const handleCloseScanner = () => {
        setOpenScanner(false);
    };
    const handleCloseGenerate = () => {
        setOpenGenerate(false);
    };

    return (
        <>
            <Grid sx={{ bgcolor: 'white', mt: 3, ml: 5, borderRadius: 1, width: 0.4, "@media (max-width: 768px)": { width: 1, mx: 'auto', mt: 2 } }} >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    p: 1,
                    m: 1,
                }}>
                    <Button variant="contained" sx={{ bgcolor: '#510A32' }} onClick={handleOpenScanner}>Scan Data</Button>
                    <Dialog open={openScanner} onClose={handleCloseScanner}>
                        <DialogTitle>{"Scan Data"}</DialogTitle>
                        <DialogContent> <QrcodeScanner /> </DialogContent>
                        <DialogActions> <Button onClick={handleCloseScanner}>Close</Button> </DialogActions>
                    </Dialog>

                    <Button variant="contained" sx={{ bgcolor: '#510A32' }} onClick={handleOpenGenerate}>Generate Data</Button>
                    <Dialog open={openGenerate} onClose={handleCloseGenerate}>
                        <DialogTitle>{"Generate Data"}</DialogTitle>
                        <DialogContent> <QrcodeGenerator /> </DialogContent>
                        <DialogActions> <Button onClick={handleCloseGenerate}>Close</Button> </DialogActions>
                    </Dialog>
                </Box>
            </Grid>
        </>
    );
};

export default Buttons;