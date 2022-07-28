import React, {useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
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
import Alert from '@mui/material/Alert';

const NewMovie = (prop) =>{
    const navigate = useNavigate();
    const[title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [date, setDate] = useState("");
    const [rated, setRated] = useState("");
    const [length, setLength] = useState("");
    const [stars, setStars] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [errors, setErrors] = useState([]);
    const onSubmitHandler = (e) =>{
        
        e.preventDefault();
        axios.post("http://localhost:8000/api/movies",{
            title,
            genre,
            director,
            date,
            rated,
            length,
            stars,
            createdBy
        })
        .then((res)=>{
            console.log("Movie Added: ", res);
            navigate("/movies");
        })
        .catch(err=>{
            console.log(err);
            setErrors(err.response.data.errors);
        })
    }


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
                            <Link href ="/edit" underline="none" color={'black'}>Edit a Movie</Link>
                        </Button>
                        <Button variant="contained"  color="logoutButton">Log Out</Button>
                    </Stack>
                </Grid>
            </Grid>
            <div>
                <h2>
                    Edit (Title Placeholder)
                </h2>
            </div>  

    {/*    Start of input fields                      */ }

    <form onSubmit={onSubmitHandler}  method='post'>
            <Masonry columns={2} spacing={1}>   
            <table>
                <Grid sx={{width: 1200, maxWidth: '100%',}} container spacing={2} >
            <Grid item xs={8}>
            <TableRow>
            <label>Title: </label>
            <TextField fullWidth  id="outlined-basic" variant="outlined"  onChange={(e)=>setTitle(e.target.value)} value={title}/>
            {errors.title ? <Alert severity="error"><p>{errors.title.message}</p></Alert> : null}
            </TableRow>
            <TableRow>
            <label>Genre: </label>
            <TextField  fullWidth id="outlined-basic" variant="outlined"/>
            </TableRow>
            <TableRow>  

            <label>Director: </label>
            <TextField fullWidth id="outlined-basic" variant="outlined"/>
            </TableRow>

            <TableRow>

            <label>Release Date: </label>
            <TextField  fullWidth id="outlined-basic" variant="outlined" type={"date"}/>
            </TableRow>
            <TableRow><div>
            <label>Description: </label></div>
            <TextareaAutosize fullWidth aria-label="maximum height" minRows={15} style={{ width: 575, height: 100 }}/>
</TableRow>

<TableRow>  

            <label>Add Image: </label>
            <IconButton aria-label="upload" size="large" color="primary">
            <UploadIcon/>
            </IconButton>
            </TableRow>
</Grid>
<Grid item xs={4}>
            
            <label>Rated: </label>
            <TableRow>
        <Select sx={{width: 100}}>
        <MenuItem value={1}>G</MenuItem>
        <MenuItem value={2}>TV-14</MenuItem>
        <MenuItem value={3}>R</MenuItem>
        <MenuItem value={4}>MA</MenuItem>
        </Select>
            </TableRow>
    
            <label>Length: </label>
            <TableRow>
            <TextField 
            sx={{width: 150}} 
            type={"time"}
            fullWidth id="outlined-basic" 
            variant="outlined"/>


            </TableRow>

            <label>Stars: </label>
            <TableRow>
            <Select sx={{width: 150}}>
            <MenuItem value={1}><StarIcon color='starIcon'/> </MenuItem>
            <MenuItem value={2}>
                <StarIcon color='starIcon'/>
                <StarIcon color='starIcon'/>
            </MenuItem>
            <MenuItem value={3}>
            <StarIcon color='starIcon'/> 
            <StarIcon color='starIcon'/>
            <StarIcon color='starIcon'/>
            
            </MenuItem>
            <MenuItem value={4}>
                <StarIcon color='starIcon'/>
                <StarIcon color='starIcon'/>
                <StarIcon color='starIcon'/>
                <StarIcon color='starIcon'/>
                </MenuItem>
            </Select>
            
            </TableRow>
            <TableRow>
            <Button variant="contained"  color="logoutButton">Submit</Button>
            </TableRow>
            </Grid>
            </Grid>
            </table>
        </Masonry>

</form>
            </ThemeProvider></Container>
        </div>
    );
}
export default NewMovie;