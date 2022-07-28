import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container } from "react-bootstrap";



const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/login", 
            {
                email: email,
                password: password,
            },
            {
                withCredentials: true
            }
        )
        .then((res) => {
            console.log(res.cookies);
            console.log(res);
            console.log(res.data, "we are logged in");
            navigate("/movies");
        })
        .catch((err) => {
            console.log(err.response);
            setErrorMessage(err.response.data.message)
        });
    }

    // const handleLogout = () => {
    //     axios.post("http://localhost:8000/logout")
    //     .then((response) => {
    //         console.log(response);
    //         navigate("/");
    //     })
    //     .catch((err) => console.log(err))
    // }


    return <Container className="my-4">
    <h2>Login</h2>
    <p className="error-text">{errorMessage ? errorMessage : "" }</p>
    <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
        <Button variant="success" type="submit">
            Login
        </Button>
    </Form>
</Container>
};

export default Login;