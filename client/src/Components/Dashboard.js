import React, { Component } from 'react';
import Timeline from './Timeline.js';
import NavBar from './NavBar.js';
import { isAuthed } from '../Auth.js';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	insert = () => {
		this.props.history.push('/insert')
	}

	componentDidMount = () => {
		if(!isAuthed) this.props.history.push('/')
	}

	render() {
		return (
			<React.Fragment>
				<NavBar/>
				<button className="custom-btn-sec text-center insert-btn" onClick={this.insert}>Insert a timeline record</button>
				<div>
					<Timeline data={this.state.timelineData} />
				</div>
			</React.Fragment>
		)
	}
}

export default Dashboard;