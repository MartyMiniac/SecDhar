import { session } from '../controllers/session';
import AppBar from '@mui/material/AppBar';
import { Container } from '@mui/system';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import { useState } from 'react';

const LoginPage = () => {
    const [name, setName] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [sex, setSex] = useState('');
    const [birthday, setBirthday] = useState('2022-05-13');
    const [address, setAddress] = useState('');

    const localLoginHandler = () => {
        const profile = {
            name: name,
            aadhar: aadhar,
            gender: sex,
            dob: birthday,
            address: address
        }

        session.login(profile)
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6" noWrap>
                            Secdhar
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container
                maxWidth="xl"
                sx={{
                    paddingTop: '1em',
                }}
            >
                <Paper
                    elevation={12}
                    sx={{
                        padding: '1em',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            margin: '0.5em 0.25em',
                        }}
                    >
                        Login
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        ></TextField>
                        <TextField
                            label="Aadhar Number"
                            variant="outlined"
                            value={aadhar}
                            onChange={(event) => {
                                setAadhar(event.target.value)
                            }}
                        ></TextField>
                        <FormControl fullWidth>
                            <InputLabel id="inputSex">Gender</InputLabel>
                            <Select
                                labelId="inputSex"
                                value={sex}
                                onChange={(event) => {
                                    setSex(event.target.value);
                                }}
                                label="Gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Birthday"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={birthday}
                            onChange={(event) => {
                                setBirthday(event.target.value);
                            }}
                        ></TextField>
                        <TextField
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={(event) => {
                                setAddress(event.target.value)
                            }}
                        ></TextField>
                    </Stack>
                    <Container
                        disableGutters
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'row-reverse',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                margin: '1em 0em',
                                minWidth: '8em',
                            }}
                            onClick={localLoginHandler}
                        >
                            Login
                        </Button>
                    </Container>
                </Paper>
            </Container>
        </>
    );
};

export default LoginPage;
