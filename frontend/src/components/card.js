import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
export default function Cards() {

    return (

        <Card sx={{ display: 'flex', height: 0.3, m: 3, "@media (max-width: 768px)": { height: 'auto' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 0.5 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        First Name
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Last Name
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 0.5 }}
                image="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Live from space album cover"
            />
        </Card>
    );
}