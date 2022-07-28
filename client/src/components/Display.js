import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Container, Card, Col, Row } from "react-bootstrap";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { pink } from '@mui/material/colors';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { orange } from '@mui/material/colors';


const Display = (props) =>{

    const [movieList, setMovieList] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        axios.get("http://localhost:8000/api/movies")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setMovieList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("https://localhost:8000/user/secure",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    const deleteMovie = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/movies/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setMovieList(movieList.filter(movie => movie._id !== idFromBelow))
            })
            .catch((err) => console.log(err))
    }

    const handleLogout = () => {
        axios.post("http://localhost:8000/logout",
            {},
            {
                withCredentials: true,
            }
        )
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((err) => console.log(err))
    }
    

    return <Container className="my-4">
        <Stack direction="horizontal" gap="4" className="mb-3">
        <h1 className="me-auto">Welcome to Movie Club</h1>
        <Button variant="outline-info">
            <Link to="/new/movies">Add Movie</Link>
        </Button>
        <Button variant="outline-danger" onClick={() => handleLogout()}>Logout</Button>
        </Stack>
        <div>
            {
                movieList.map((movie, index) => (
                    <div 
                        style={{textAlign:"center"}}
                        key={index}
                    >
                        <Row xs={1} md={2} className="g-4 justify-content-md-center">
                            
                                <Col>
                                    <Card className="mt-2">
                                        <Card.Img className="m-auto" variant="top" src={movie.movieArt} style={{width: "302px", height: "200px"}} />
                                    </Card>
                                    <Card.Body>
                                        <Card.Title className="mt-2">
                                            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                                        </Card.Title>
                                        <Card.Text>
                                            <p>{movie.description}</p>
                                            <Stack direction="horizontal" gap="3" className="justify-content-md-center my-4">
                                                <Button variant="outline-success">
                                                    <Link to={`/user/profile/${movie.createdBy?.firstName}`}>Posted By: {movie.createdBy?.firstName}</Link>
                                                </Button>
                                                <Checkbox {...label} icon={<FavoriteBorderOutlinedIcon />} checkedIcon={<FavoriteOutlinedIcon />} sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                    color: pink[600],
                                                    },
                                                }}/>
                                                <Checkbox {...label} icon={<ThumbDownOffAltIcon />} checkedIcon={<ThumbDownAltIcon />} sx={{
                                                    color: orange[800],
                                                    '&.Mui-checked': {
                                                    color: orange[600],
                                                    },
                                                }}/>
                                            </Stack>
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            
                        </Row>
                    </div>
                ))
            }
        </div>
    </Container>
}

export default Display;