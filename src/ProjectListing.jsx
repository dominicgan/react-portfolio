import React, { Component } from 'react';

class ProjectListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			baseUrl: 'https://dominicgan.github.io',
			requestUrl: 'https://dominicgan.github.io/portfolio.json'
		};
	}
  	componentDidMount() {
	  fetch(this.state.requestUrl)
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
						<Projects projects={this.state.portfolio.projects} baseUrl={this.state.baseUrl}/>
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

class Projects extends Component {
  	componentDidMount() {
	}
	render() {
		return (
			<ul>
			{
				this.props.projects.map((project, key) => {
					return (
						<li key={key}>
						<Project project={project} baseUrl={this.props.baseUrl}/>
						</li>
					)
				})
			}
			</ul>
			);
	}
}

class Project extends Component {
  	componentDidMount() {
	}
	render() {
		return (
			<table>
			<tbody>
				<tr>
					<th>Title</th>
					<td>{this.props.project.title}</td>
				</tr>
				<tr>
					<th>Date</th>
					<td>{this.props.project.date}</td>
				</tr>
				<tr>
					<th>categories</th>
					<td>{this.props.project.categories.join(', ')}</td>
				</tr>
				<tr>
					<th>url</th>
					<td><a target='_blank' rel='noopener noreferrer' href={this.props.baseUrl + this.props.project.url}>Link</a></td>
				</tr>
				</tbody>
			</table>
			)
	}
}

export default ProjectListing;
