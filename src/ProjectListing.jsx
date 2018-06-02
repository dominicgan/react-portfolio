import React, { Component } from 'react';
import './Project.css';

class ProjectListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			baseUrl: 'https://dominicgan.github.io',
			requestUrl: 'https://dominicgan.github.io/portfolio.json',
			activeFilter: {
				name: 'All',
				class: 'all'
			}
		};
	}
  	componentDidMount() {
	  fetch(this.state.requestUrl)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
			this.setState({
				'ready': true,
				'filters': data.filters,
				'projects': data.projects,
				'data': data
			});
		});
  }
  onFilter(filterObj) {
	// do nothing if active filter is same as clicked filter
  	if (JSON.stringify(this.state.activeFilter) === JSON.stringify(filterObj)) return;

  	this.setState({'activeFilter': filterObj});

  	if (filterObj.class !== 'all') {
	  	// filter portfolio data
	  	let filteredData = this.state.data.projects;
	  	// console.log(this.state.data.filters);
	  	filteredData = filteredData.filter(function(item){
	      return item.categories.indexOf(filterObj.class) > -1;
	    });

	    this.setState({projects: filteredData});
  	} else {
  		// return all projects if selected filter is 'All'
	    this.setState({projects: this.state.data.projects});
  	}
  }
  render() {
	let printProjectListing = () => {
			if (this.state.ready) {
				return (
					<div className='project__wrapper'>
						<ProjectCategories filters={this.state.filters} onFilter={this.onFilter.bind(this)}/>
						<hr/>
						<Projects projects={this.state.projects} baseUrl={this.state.baseUrl}/>
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
  		// add All filter to state
  		let filterObj = [{
  			name: 'All',
  			class: 'all'
  		}, ...this.props.filters];
  		this.setState({'filters': filterObj});
	}
	render() {
		let printCatList = () => {
			if (this.state && this.state.filters) {
				let catList = Array.prototype.map.call(this.state.filters, (el, i) => {
					return (
						<li key={i}>
							<button onClick={this.props.onFilter.bind(this, el)} data-target={el}>{el.name}</button>
						</li>);
						// <table>
						// 	<tbody>
						// 		<tr>
						// 			<th>Class</th>
						// 			<td>{el.class}</td>
						// 		</tr>
						// 		<tr>
						// 			<th>Name</th>
						// 			<td>{el.name}</td>
						// 		</tr>
						// 	</tbody>
						// </table>
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
