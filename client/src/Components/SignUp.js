import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        };
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log({ [e.target.name]: e.target.value });
    }
    onSignUp = e => {
        e.preventDefault();
        if (this.state.confirm_password !== this.state.password) {
            alert(`Passwords not matching`);
            // console.log(this.state.password);
            // console.log(this.state.confirm_password);
        }
        else {
            // console.log(this.state);

            var data = new FormData();
            data.append("first_name", this.state.first_name);
            data.append("last_name", this.state.last_name);
            data.append("email", this.state.email);
            data.append("password", this.state.password);
            data.append("phone", this.state.phone);
            data.append("dob", this.state.dob);

            var requestOptions = {
                method: 'POST',
                body: data
            };

            fetch("http://localhost:8888/route/signup", requestOptions)
                .then(result => result.json())
                .then(
                    res => {
                        // console.log(res);
                        if (res.status === 201) {
                            alert(`Sign up successful`);
                            this.props.history.push('/');
                        }
                    }
                )
                .catch(error => console.log('error', error));
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="signIn">
                    <h2 className="font-col bold text-center mt-32 mb-64">Sign up</h2>
                    <Form onSubmit={this.onSignUp}>
                        <Form.Group>
                            <Col md={{ offset: 1, span: 10 }} className="p-0">
                                <Form.Control required placeholder="First name" name="first_name" onChange={this.changeHandler} />
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col md={{ offset: 1, span: 10 }} className="p-0">
                                <Form.Control required placeholder="Last name" name="last_name" onChange={this.changeHandler} /> 
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col md={{ offset: 1, span: 10 }} className="p-0">
                                <Form.Control required type="Email" placeholder="Email" name="email" onChange={this.changeHandler} />
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col md={{ offset: 1, span: 10 }} className="p-0">
                                <Form.Control required type="password" placeholder="Password" name="password" onChange={this.changeHandler} />
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col md={{ offset: 1, span: 10 }} className="p-0">
                                <Form.Control required type="password" placeholder="Confirm password" name="confirm_password" onChange={this.changeHandler} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 4, offset: 4 }} className="text-center mt-32 mb-32">
                                <button className="custom-btn" type="submit">Sign up</button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

export default SignUp;