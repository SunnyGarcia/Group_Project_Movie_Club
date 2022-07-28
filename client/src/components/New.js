import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack, Form, Container, Col, Row } from "react-bootstrap"

const New = () =>{
    const navigate = useNavigate();
    const[title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [yearReleased, setYearReleased] = useState("");
    const [description, setDescription] = useState("");
    const [movieArt, setMovieArt] = useState("");
    const [rated, setRated] = useState("");
    const [length, setLength] = useState("");
    const [rating, setRating] = useState("");
    const [actor, setActor] = useState("");
    const [errors, setErrors] = useState({});


    const onSubmitHandler = (e) =>{
        
        e.preventDefault();
        axios.post("http://localhost:8000/api/movies",
            {
                title,
                genre,
                director,
                yearReleased,
                description,
                movieArt,
                rated,
                length,
                rating,
                actor
            },
            {
                withCredentials: true
            }
        )
        .then((res)=>{
            console.log("Movie Added: ", res);
            navigate("/movies");
        })
        .catch(err=>{
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
        })
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
        <h1 className="me-auto">Add a Movie</h1>
        <Button variant="info">
            <Link to="/movies">Home</Link>
        </Button>
        <Button variant="outline-danger" onClick={() => handleLogout()}>Logout</Button>
        </Stack>

        {/* Start of input text */}
        <Stack direction="horizontal">
            <Form onSubmit={onSubmitHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {errors.title ? <p>{errors.title.message}</p> : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                        {errors.genre ? <p>{errors.genre.message}</p> : null}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDirector">
                        <Form.Label>Director</Form.Label>
                        <Form.Control type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
                        {errors.director ? <p>{errors.director.message}</p> : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridyearReleased">
                        <Form.Label>Year Released</Form.Label>
                        <Form.Control type="number" value={yearReleased} onChange={(e) => setYearReleased(e.target.value)} />
                        {errors.yearReleased ? <p>{errors.yearReleased.message}</p> : null}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDirector">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description ? <p>{errors.description.message}</p> : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMovieArt">
                        <Form.Label>Image Link/URL</Form.Label>
                        <Form.Control type="text" value={movieArt} onChange={(e) => setMovieArt(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridActor">
                        <Form.Label>Actor</Form.Label>
                        <Form.Control type="text" value={actor} onChange={(e) => setActor(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLength">
                        <Form.Label>Length</Form.Label>
                        <Form.Control type="text" value={length} onChange={(e) => setLength(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLength">
                        <Form.Label>Rated</Form.Label>
                        <Form.Control type="text" value={rated} onChange={(e) => setRated(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Rating: ?/10</Form.Label>
                        <Form.Control type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                        {errors.rating ? <p>{errors.rating.message}</p> : null}
                    </Form.Group>
                </Row>
                <Button variant="success" type="submit">
                    Add Movie
                </Button>
            </Form>
        </Stack>
    </Container>
};

export default New;