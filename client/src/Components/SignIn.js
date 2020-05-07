import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        };
    }

    onSignIn = e => {
        e.preventDefault();
        // console.log(this.state);

        var data = new FormData();
        data.append("email", this.state.email);
        data.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            body: data
            // redirect: 'follow'
        };

        fetch("http://localhost:8888/route/signin", requestOptions)
            .then(result => result.json())
            .then(
                res => {
                    // console.log(res);
                    if (res.status === 200) {
                        var data = res.data;
                        console.log(data);
                        alert(`Logged in successfully`);
                        // this.props.history.push('/Dashboard', { data });
                    }
                    else {
                        alert(res.message);
                    }
                }
            )
            .catch(error => console.log('Error', error));
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target.name + " -> " + e.target.value);
    }

    render() {
        return (
            <React.Fragment>
                <div className="signIn">
                    <div className="text-center m-64">
                        <h2 className="font-col bold">Sign in</h2>
                    </div>
                    <div className="m-16 mb-64">
                        <Form onSubmit={this.onSignIn}>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control required type="email" name="email" value={this.email} placeholder="Email" onChange={this.changeHandler} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control required type="password" name="password" value={this.password} placeholder="Password" onChange={this.changeHandler} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-64">
                                {/* <Col sm={{ span: 5, offset: 1 }}>
                                    <Form.Check type="checkbox" label="Keep me logged in" />
                                </Col> */}
                                <Col sm={{ span: 4, offset: 7 }}>
                                    <Link to="/forgotPassword" className="btn-link">Forgot password?</Link>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col className="text-center" sm={{ span: 6, offset: 3 }}>
                                    <button className="custom-btn" type="submit">Sign in</button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col className="text-center" sm={{ span: 6, offset: 3 }}>
                                    <p className="text-center mb-0">Don't have an account?</p>
                                    <Link to="/SignUp" className="btn-link">Sign Up</Link>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SignIn;