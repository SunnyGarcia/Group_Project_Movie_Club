import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';

const Register = (props) => {
    const [confirmReg, setConfirmReg] = useState("");
    // not added email duplicate error
    const [errors, setErrors] = useState([]);

    const [ user, setUser ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register",
        user,
        {
            withCredentials: true,
        })
        .then(res => {
            console.log(res.data);
            setUser({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
            setConfirmReg("Thank you for Registering, please login!")
            setErrors({});
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        });
    };

    return <Container className="my-4">
    <h2>Register</h2>
    {
        confirmReg ?
        <h4 style={{color : "green"}}>{confirmReg}</h4>
        : null
    }
    <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
                type="text" 
                name="firstName" 
                value={user.firstName} 
                onChange={(e) => handleChange(e)}
            />
            {
                errors.firstName ?
                    <span className="error-text">{errors.firstName.message }</span>
                    : null
            }
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={(e) => handle(e)}
            />
            {
                errors.lastName ?
                    <span className="error-text">{errors.lastName.message}</span>
                    : null
            }
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={ handleChange } 
            />
            {
                errors.email ?
                    <span className="errors-text">{ errors.email.message }</span>
                    : null
            }
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password"
                name="password"
                value={user.password}
                onChange={ handleChange }
            />
            {
                errors.password ?
                    <span className="errors-text">{ errors.password.message }</span>
                    : null
            }
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={ handleChange } 
            />
            {
                errors.confirmPassword ?
                    <span className="error-text">{ errors.confirmPassword.message }</span>
                    : null
            }
        </Form.Group>
        <Button variant="info" type="submit">
            Register
        </Button>
    </Form>
</Container>
};

export default Register;