import { Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import Test from './qrScanner';
import Qrcode from './qrGenerator'

const Buttons = () => {
    const [openRead, setOpen] = useState(false);
    const [openGenerate, setOpenGenerate] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClickOpenGenerate = () => {
        setOpenGenerate(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseGenerate = () => {
        setOpenGenerate(false);
    };

    return (
        <>

            <Grid sx={{ bgcolor: 'white', mx: 'auto', mt: 2, borderRadius: 1, width: 1 / 4, "@media (max-width: 768px)": { width: 1 } }} >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    p: 1,
                    m: 1,
                }}>
                    <Button variant="contained" sx={{ bgcolor: '#510A32' }} onClick={handleClickOpen}>Read Data</Button>
                    <Dialog open={openRead} onClose={handleClose}>
                        <DialogTitle>{"Read Data"}</DialogTitle>
                        <DialogContent> <Test /> </DialogContent>
                        <DialogActions> <Button onClick={handleClose}>Close</Button> </DialogActions>
                    </Dialog>

                    <Button variant="contained" sx={{ bgcolor: '#510A32' }} onClick={handleClickOpenGenerate}>Share Data</Button>
                    <Dialog open={openGenerate} onClose={handleCloseGenerate}>
                        <DialogTitle>{"Share Data"}</DialogTitle>
                        <DialogContent> <Qrcode/> </DialogContent>
                        <DialogActions> <Button onClick={handleCloseGenerate}>Close</Button> </DialogActions>
                    </Dialog>
                </Box>
            </Grid>

        </>
    );
};

export default Buttons;
