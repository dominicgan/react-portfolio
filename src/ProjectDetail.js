import React, { Component } from 'react';

class ProjectDetail extends Component {
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
		<code>{JSON.stringify(this.state.resume.basics)}</code>
				);
			} else {
				return;
			}
		}
    return (
	  <div className="project-detail">
		<h1>Detail</h1>
		<h2>{this.props.match.params.id}</h2>
		{printResume()}
	  </div>
    );
  }
}

export default ProjectDetail
