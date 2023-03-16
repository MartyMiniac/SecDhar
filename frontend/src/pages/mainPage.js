import { AppBar, BottomNavigation, BottomNavigationAction, Box, Paper, Toolbar, Typography, Button } from '@mui/material';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { useState } from 'react';
import { session } from '../controllers/session';
import ShareAuth from '../components/shareAuthComponents';
import Logs from '../components/fulllogs';
import { styled } from "@mui/material/styles";

import { sendProtocol } from '../controllers/exchangeProtocol';

const BottomNavigationActionStyled = styled(BottomNavigationAction,)(`
  color: white;
  &.Mui-selected {
    color: red;
  }
`);

const MainPage = () => {
    const [bottomNavSelection, setBottomNavSelection] = useState(0);

    (() => {
        sendProtocol.init();
        sendProtocol.getData(session.getPubCreds());
    })()

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

            {bottomNavSelection === 0 && <ShareAuth />}
            {bottomNavSelection === 1 && <Logs />}

            <Box>
                <Paper
                    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
                    elevation={3}
                >
                    <BottomNavigation
                        showLabels
                        value={bottomNavSelection}
                        sx={{ bgcolor: '#510A32' }}
                    >

                        <BottomNavigationActionStyled
                            label="Share Auth"
                            icon={<SwapCallsIcon />}
                            onClick={() => setBottomNavSelection(0)}

                        />
                        <BottomNavigationActionStyled
                            label="Logs"
                            icon={<PlaylistAddCheckCircleIcon />}
                            onClick={() => { setBottomNavSelection(1); session.display() }}

                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    );
};

export default MainPage;
