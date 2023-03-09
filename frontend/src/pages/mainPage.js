import AppBar from '@mui/material/AppBar';
import { BottomNavigation, BottomNavigationAction, Box, Paper, Toolbar, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { useState } from 'react';
import { session } from '../controllers/session';
import Test from './qrScanner';
import Qrcode from './qrGenerator'

const MainPage = () => {
    const [bottomNavSelection, setBottomNavSelection] = useState(0);
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

            <AppBar position="static" sx={{ bgcolor: '#510A32', borderRadius: '5px' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Secdhar
                    </Typography>
                    <Button color="inherit" onClick={session.logout}>Logout</Button>
                </Toolbar>
            </AppBar>

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

            <Box>
                <Paper
                    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
                    elevation={3}
                >
                    <BottomNavigation
                        showLabels
                        value={bottomNavSelection}
                        onChange={(event, newValue) => {
                            setBottomNavSelection(newValue);
                        }}
                        sx={{ bgcolor: '#510A32' }}
                    >
                        <BottomNavigationAction
                            label="Share Auth"
                            icon={<SwapCallsIcon />}
                        />
                        <BottomNavigationAction
                            label="Logs"
                            icon={<PlaylistAddCheckCircleIcon />}
                            onClick={session.display}
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    );
};

export default MainPage;
