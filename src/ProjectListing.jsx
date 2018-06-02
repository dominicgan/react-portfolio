import React, { Component } from 'react';
import './Project.css';

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
					<div className='project__wrapper'>
						<ProjectCategories categories={this.state.portfolio.filters}/>
						<hr/>
						<Projects projects={this.state.portfolio.projects} baseUrl={this.state.baseUrl}/>
					</div>
				);
			} else {
				return;
			}
	};
    return (
	  <div className="project">
		<h1>Listing</h1>
		{printProjectListing()}
	  </div>
    );
  }
}

class ProjectCategories extends Component {
  	componentDidMount() {
  		this.setState({'categories': this.props.categories});
	}
	render() {
		let printCatList = () => {
			if (this.state && this.state.categories) {
				let catList = Array.prototype.map.call(this.state.categories, (el, i) => {
					return (
						<li key={i}>
							<table>
								<tbody>
									<tr>
										<th>Class</th>
										<td>{el.class}</td>
									</tr>
									<tr>
										<th>Name</th>
										<td>{el.name}</td>
									</tr>
								</tbody>
							</table>
						</li>);
				});
				return catList;
			}
		};

		return (
			<ul className='project__filters'>
				{printCatList()}
			</ul>
			); 
		
	}
}

class Projects extends Component {
  	componentDidMount() {
	}
	render() {
		return (
			<ul className='project__list'>
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
  		this.setState({'project': this.props.project});
	}
	render() {
		let printCoverImage = () => {
			if (this.state && this.state.project.coverImage) {
				let imgData = this.state.project.coverImage;
				let imgList = Object.keys(imgData).map((key, i) => {
					return (
						<tr key={i}>
							<th>{key}</th>
							<td>
								<a href={this.props.baseUrl + imgData[key]} rel='noreferrer noopener' target='_blank'>
									{'coverimage-'+this.state.project.title.toLowerCase().replace(/ /g, '-')+'-'+key}
								</a>
							</td>
						</tr>
						);
				});
				return imgList;
			} else return;
		};
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
					<th>Categories</th>
					<td>{this.props.project.categories.join(', ')}</td>
				</tr>
				<tr>
					<th>Featured</th>
					<td>{this.props.project.featured ? 'yes' : 'no'}</td>
				</tr>
				<tr>
					<th>Url</th>
					<td><a target='_blank' rel='noopener noreferrer' href={this.props.baseUrl + this.props.project.url}>Link</a></td>
				</tr>
				<tr>
					<th>Cover image</th>
					<td>
						<img src={this.props.baseUrl + this.props.project.coverImage.xs} alt="coverImage-xs"/>
						<table><tbody>{printCoverImage()}</tbody></table>
					</td>
				</tr>
				</tbody>
			</table>
			)
	}
}

export default ProjectListing;
