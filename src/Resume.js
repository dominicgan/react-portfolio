import React, { Component } from 'react';

class Resume extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
  	componentDidMount() {
	  let src = 'https://dominicgan.github.io/resume.json';
	  // let src = '/resume.json';
	  fetch(src)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			this.setState({'resume': data});
		});
  	}
	render() {
		let printResume = () => {
			if (this.state.resume) {
				return (
					<div>
		<code>{JSON.stringify(this.state.resume)}</code>
					</div>
				);
			} else {
				return;
			}
		}
    return (
	  <div className="resume">
		<h1>Bio</h1>
		{printResume()}
	  </div>
    );
  }
}

export default Resume
