import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm_password: ''
        };
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target.name + " -> " + e.target.value);
    }
    next = e => {
        e.preventDefault();

        fetch(`http://localhost:8888/route/checkEmail?email=${this.state.email}`)
            .then(result => result.json())
            .then(
                res => {
                    if (res.status === 200) {
                        let form = document.getElementById('form-1');
                        form.hidden = true;
                        form = document.getElementById('form-2');
                        form.hidden = false;
                    }
                    else if (res.status === 404) {
                        alert(`Error from server\n***** Try again later *****`)
                    }
                    else {
                        alert(`Invalid email or email not registered`)
                    }
                }
            )
            .catch(error => console.log('Error', error));
    }
    reset = e => {
        e.preventDefault();

        var data = new FormData();
        data.append("email", this.state.email);
        data.append("password", this.state.password);
        
        if (this.state.confirm_password !== this.state.password) {
            alert(`Passwords not matching`);
            // console.log(this.state.password);
            // console.log(this.state.confirm_password);
        } else {
            var requestOptions = {
                method: 'PUT',
                mode: 'cors',
                body: data
            };

            fetch("http://localhost:8888/route/changePassword", requestOptions)
                .then(result => result.json())
                .then(
                    res => {
                        if (res.status === 200) {
                            alert('Password reset successful');
                            this.props.history.push('/');
                        }
                        else {
                            alert(res.message);
                        }
                    }
                )
                .catch(error => console.log('Error', error));
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='signIn'>
                    <div className="text-center m-64">
                        <h2 className="font-col bold">Forgot Password</h2>
                    </div>
                    <div className='m-16 mb-64'>
                        <Form id='form-1' onSubmit={this.next}>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control className='mb-64' required type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.changeHandler} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 4, offset: 7 }}>
                                    <Button bsPrefix='custom-btn-sec' type='submit'>Next</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                        <Form id='form-2' hidden onSubmit={this.reset}>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Form.Control required type="email" name="email" value={this.state.email} placeholder="Email" readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Col md={{ offset: 1, span: 10 }} className="p-0">
                                    <Form.Control required type="password" placeholder="Password" name="password" onChange={this.changeHandler} />
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Col md={{ offset: 1, span: 10 }} className="p-0">
                                    <Form.Control className='mb-64' required type="password" placeholder="Confirm password" name="confirm_password" onChange={this.changeHandler} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 6, offset: 3 }}>
                                    <Button bsPrefix='custom-btn' type='submit'>Reset Password</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ForgotPassword;