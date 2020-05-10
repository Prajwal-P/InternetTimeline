import React, { Component } from 'react';
import userIcon from '../Resources/USERicon.jpg';
import { user } from '../Auth.js'

class MyNav extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	click = e => {
		user.signout()
		window.location.reload(false)
	}

	render() {
		// console.log(this.props);
		return (
			<React.Fragment>				
				<div className="background-col p-2 nav-bar">
					<h1 className="bold m-0 heading">Internet Timeline</h1>
					<img className="icon border-radius-50" src={userIcon} alt="#" />
					<button className="background-col" onClick={this.click}>Sign Out</button>
				</div>
			</React.Fragment>
		);
	}
}

export default MyNav;