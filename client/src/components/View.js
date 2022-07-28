import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Stack, Container, Card, Col, Row } from "react-bootstrap";

const View = (props) => {
    const {id} = useParams();
    const [oneMovie, setOneMovie] = useState({});
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/movies/${id}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setOneMovie(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteMovie = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/movies/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
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
        <h1 className="me-auto">More about {oneMovie.title}</h1>
        <Button variant="outline-success">
            <Link to="/movies/">Home</Link>
        </Button>
        <Button variant="outline-info">
            <Link to="/new/movies">Add Movie</Link>
        </Button>
        <Button variant="outline-danger" onClick={() => handleLogout()}>Logout</Button>
        </Stack>
        <div>
            <div 
                style={{textAlign:"center"}}
            >
                <Row xs={1} md={2} className="g-4 justify-content-md-center">
                        <Col>
                            <Card className="mt-2">
                                <Card.Img className="m-auto" variant="top" src={oneMovie.movieArt} style={{width: "302px", height: "200px"}} />
                            </Card>
                            <Card.Body>
                                <Card.Title>
                                    {oneMovie.title}
                                </Card.Title>
                                <Card.Text className="mt-2">
                                    <p>Genre: {oneMovie.genre}</p>
                                    <p>Director: {oneMovie.director}</p>
                                    <p>Description: {oneMovie.description}</p>
                                    <p>Year Released: {oneMovie.yearReleased}</p>
                                    <p>Rated: {oneMovie.rated}</p>
                                    <p>Length: {oneMovie.length}</p>
                                    <p>Rating: {oneMovie.rating}</p>
                                    <p>Actor(s): {oneMovie.actor}</p>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                </Row>
            </div>
        </div>
    </Container>
}

export default View;
