import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Masonry from '@mui/lab/Masonry/Masonry';
import { Container, maxWidth } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import StarIcon from '@mui/icons-material/Star';
import Link from '@mui/material/Link';

const theme = createTheme({
    primary: {
        main: '#ff4400',
    },
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
        main: '#0971f1',
        darker: '#053e85',
        },
        neutral: {
        main: '#64748B',
        contrastText: '#fff',
        },
    homeButton:{
        main: "#79a922",
    },
    addButton: {
        main: "#00ffff",
    },
    logoutButton:{
        main: "#e74392",
    },
    submitButton:{
        main: "#ce7afd",
    },
    starIcon:{
        main: "#ffd700",
    },
    },
    });
    
const Dashboard = (prop) =>{
    
    return(
        <div>
            <Container sx={{maxWidth: '100%'}}>
            <ThemeProvider theme={theme}>
            <Grid container spacing={2} >
                <Grid item xs={4}>
                <h1>
                    Hello, UserName
                </h1>
                </Grid>
                <Grid item xs={8} container direction="row-reverse">
                    <Stack spacing={2} direction="row" m={4}>
                        <Button variant="contained" color="homeButton">Home</Button>
                        <Button variant="contained" color="addButton">
                            <Link href ="/new" underline="none" color={'black'}>Add a Movie</Link>
                        </Button>
                        <Button variant="contained"  color="logoutButton">Log Out</Button>
                    </Stack>
                </Grid>
            </Grid> 
            </ThemeProvider></Container>
        </div>
    );
}
export default Dashboard;