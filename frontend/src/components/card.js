import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
export default function Cards() {

    return (

        <Card sx={{ display: 'flex', m: 'auto', width: 0.4, "@media (max-width: 768px)": { width: 'auto' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h5">
                        First Name
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" >
                        Last Name
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ maxWidth: '200px',maxHeight: '200px', ml: 'auto' }}
                image="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
        </Card>
    );
}