import React, { Component } from 'react';

class ProjectDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
  	componentDidMount() {
  	}
	render() {
    return (
	  <div className="project-detail">
		<h1>Detail</h1>
		<h2>{this.props.match.params.id}</h2>
	  </div>
    );
  }
}

export default ProjectDetail
