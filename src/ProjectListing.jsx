import React, { Component } from 'react';
import './ProjectListing.css';
import { Link } from 'react-router-dom';

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
		.then((res) => res.json())
		.then((data) => {
			this.setState({
				'filters': [{name: 'All', class: 'all'}, ...data.filters],
				'projects': data.projects,
				'data': data
			});

			let presentFilters = this.getPresentFilters(this.state.data.projects);
			this.setState({'presentFilters': presentFilters});
			this.setState({'ready': true});
		});
  }
  getPresentFilters(projects) {
  	let categories = [];

  	// add all category arrays into new array
  	projects.map((el , i) => {
  		return categories.push(...el.categories);
  	});

  	// reduce to unique set of categories and append all category in front
  	categories = ['all', ...new Set(categories)];

  	return categories;
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
						<ProjectCategories filters={this.state.filters} presentFilters={this.state.presentFilters} onFilter={this.onFilter.bind(this)}/>
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
	render() {
		let printCatList = () => {
				let catList = Array.prototype.map.call(this.props.filters, (el, i) => {
					if (this.props.presentFilters.indexOf(el.class) > -1) {
						return (
							<li key={i}>
								<button onClick={this.props.onFilter.bind(this, el)} data-target={el}>{el.name}</button>
							</li>);
						}
				});
				return catList;
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
	printCoverImage(imageObj) {
		return (
			<picture>
				<source srcSet={this.props.baseUrl + imageObj.sm} media="(min-width: 768px)"/>
				<source srcSet={this.props.baseUrl + imageObj.md} media="(min-width: 991pxpx)"/>
				<source srcSet={this.props.baseUrl + imageObj.lg} media="(min-width: 1200px)"/>
				<source srcSet={this.props.baseUrl + imageObj.src} media="(min-width: 1680px)"/>
				<img src={this.props.baseUrl + imageObj.xs} alt={this.props.project.title}/>
			</picture>
			);
	}
	render() {
		// render cover image as <picture>
		let printCoverImage = this.printCoverImage(this.props.project.coverImage);
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
					<td><Link to={this.props.project.url.split('.json')[0]}>Link</Link></td>
				</tr>
				<tr>
					<th>Cover image</th>
					<td>
						{printCoverImage}
					</td>
				</tr>
				</tbody>
			</table>
			)
	}
}

export default ProjectListing;
