import AppBar from '@mui/material/AppBar';
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { useState } from 'react';
import { session } from '../controllers/session';

const MainPage = () => {
    const [bottomNavSelection, setBottomNavSelection] = useState(0);
    return (
        <>
            <AppBar position="static">
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
