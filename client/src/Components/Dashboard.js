import React, { Component } from 'react';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<h1 className="background-col bold text-center p-2">Internet Timeline</h1>
				<button className="custom-btn-sec text-center insert-btn">Insert a timeline record</button>
			</React.Fragment>
		)
	}
}

export default Dashboard;