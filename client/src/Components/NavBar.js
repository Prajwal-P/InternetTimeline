import React, { Component } from 'react';
import userIcon from '../Resources/USERicon.jpg';

class MyNav extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	signOut = e => {
		console.log(this.props);
	}

	render() {
		// console.log(this.props);
		return (
			<React.Fragment>				
				<div className="background-col p-2 nav-bar">
					<h1 className="bold m-0 heading">Internet Timeline</h1>
					<img className="icon border-radius-50" src={userIcon} alt="#" />
					<a className="sign-out" onClick={this.signOut}>Sign Out</a>
				</div>
			</React.Fragment>
		);
	}
}

export default MyNav;