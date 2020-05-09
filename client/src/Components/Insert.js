import React, { Component } from 'react';
import NavBar from './NavBar.js'
import { Form, Row, Col } from 'react-bootstrap';
import { isAuthed } from '../Auth.js'

class Insert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			year: "",
			description: "",
			img_url: "",
			link: ""
		};
	}

	componentDidMount = () => {
		if (!isAuthed) this.props.history.push('/')
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
		// console.log({ [e.target.name]: e.target.value });
	}
	insert = e => {
		e.preventDefault();

		let data = new FormData();
		data.append("name", this.state.name);
		data.append("year", this.state.year);
		data.append("description", this.state.description);
		data.append("img_url", this.state.img_url);
		data.append("link", this.state.link);

		let requestOptions = {
			method: 'POST',
			body: data
		};

		fetch("http://localhost:8888/route/insert", requestOptions)
			.then(result => result.json())
			.then(
				res => {
					console.log(res);
					if (res.status === 201) {
						alert(`Event inserted`);
						this.props.history.push('/Dashboard');
					}
				}
			)
			.catch(error => console.log('error', error));
	}

	render() {
		return (
			<React.Fragment>
				<NavBar/>
				<h2 className="font-col bold text-center mt-32 mb-64">Insert</h2>
				<Form className="custom-form" onSubmit={this.insert}>
					<Form.Group>
						<Form.Row>
							<Form.Label column md={{offset: 1, span: 1}} >
								Name
								<span style={{ color: "red" }}>*</span>
							</Form.Label>
							<Col md={{ offset: 1, span: 8 }} className="p-0">
								<Form.Control required type="text" maxLength="20" placeholder="Name of the event" name="name" onChange={this.changeHandler} />
							</Col>
						</Form.Row>
					</Form.Group>
					<Form.Group>
						<Form.Row>
							<Form.Label column md={{offset: 1, span: 1}} >
								Year
								<span style={{ color: "red" }}>*</span>
							</Form.Label>
							<Col md={{ offset: 1, span: 8 }} className="p-0">
								<Form.Control required type="number" min="1900" max="2020" placeholder="Year of the event" name="year" onChange={this.changeHandler} />
							</Col>
						</Form.Row>
					</Form.Group>
					<Form.Group>
						<Form.Row>
							<Form.Label column md={{offset: 1, span: 1}} >
								Description
								<span style={{color: "red"}}>*</span>
							</Form.Label>
							<Col md={{ offset: 1, span: 8 }} className="p-0">
								<Form.Control required type="text" maxLength="100" placeholder="Brief description of the event" name="description" onChange={this.changeHandler} />
							</Col>
						</Form.Row>
					</Form.Group>
					<Form.Group>
						<Form.Row>
							<Form.Label column md={{offset: 1, span: 2}} >
								Image URL
							</Form.Label>
							<Col md={{ offset: 0, span: 8 }} className="p-0">
								<Form.Control type="url" maxLength="500" placeholder="URL of a related image" name="img_url" onChange={this.changeHandler} />
							</Col>
						</Form.Row>
					</Form.Group>
					<Form.Group>
						<Form.Row>
							<Form.Label column md={{offset: 1, span: 1}} >
								Link
								<span style={{ color: "red" }}>*</span>
							</Form.Label>
							<Col md={{ offset: 1, span: 8 }} className="p-0">
								<Form.Control required type="url" maxLength="500" placeholder="Link for additional information" name="link" onChange={this.changeHandler} />
							</Col>
						</Form.Row>
					</Form.Group>
					<Form.Group>
						<Form.Row>
							<Form.Label column md={{ offset: 1 }}>
								Fields marked with <span style={{ color: "red" }}>*</span> are required
							</Form.Label>
						</Form.Row>
					</Form.Group>
					<Form.Group as={Row}>
						<Col sm={{ span: 4, offset: 4 }} className="text-center mt-32 mb-32">
							<button className="custom-btn" type="submit">Insert</button>
						</Col>
					</Form.Group>
				</Form>
			</React.Fragment>
		)
	}
}

export default Insert;