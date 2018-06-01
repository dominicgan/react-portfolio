import React, { Component } from 'react';

class ProjectListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
  	componentDidMount() {
	  let src = 'https://dominicgan.github.io/portfolio.json';
	  // let src = '/resume.json';
	  fetch(src)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			this.setState({'portfolio': data});
		});
  	}
  render() {
	let printProjectListing = () => {
			if (this.state.portfolio) {
				return (
					<div>
		<code>{JSON.stringify(this.state.portfolio.filters)}</code>
					<hr/>
		<code>{JSON.stringify(this.state.portfolio.projects)}</code>
					</div>
				);
			} else {
				return;
			}
	};
    return (
	  <div className="project-listing">
		<h1>Listing</h1>
		{printProjectListing()}
	  </div>
    );
  }
}

export default ProjectListing;
