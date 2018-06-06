import React, { Component } from 'react';
import './ProjectDetail.css';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import 'url-search-params-polyfill';

class ProjectDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			baseUrl: 'https://dominicgan.github.io/',
			project: {},
			isLoading: true
		};
	}

  	componentDidMount() {
  		console.log(this.props.location.search);
  		let search = new URLSearchParams(this.props.location.search);
  		console.log(search);
  		for (var key of search.keys()) {
  			console.log(key, search.get(key));
  		}
  		console.log(this.props.match.params);
  		this.fetchProjectData(this.props.match.params.id);
  	}

  	componentDidUpdate(prevProps) {
  		// handle route change (view different project)
  		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setState({'isLoading': true});
	  		this.fetchProjectData(this.props.match.params.id);
			// setTimeout(() => {
			// }, 1000);

  		}
  	}

  	fetchProjectData(srcUrl) {
  		// get project json from source
  		// (id value in url)
		let baseUrl = this.state.baseUrl;
  		let dataSrc = baseUrl + 'projects/' + srcUrl + '.json';
  		console.log(dataSrc);

  		fetch(dataSrc)
  			.then((res) => res.json())
  			.then((data) => {
  				console.log(data);
  				this.setState({
  					'project': data,
	  				'isLoading': false
	  			});
  				return;
  			})
  	}

	renderCategories() {
		if (this.state.project.categories) {
			let outputObj = this.state.project.categories.map((el,i) => {
				return (
					<li key={i}>
						<span>{el}</span>
					</li>
					)
			});

			return outputObj;
		}
	}

	renderImagesArray() {
		if (this.state.project.images) {
			let outputObj = this.state.project.images.map((el,i) => {
				return (
					<li key={i}>
			    		<ProjectPicture baseUrl={this.state.baseUrl} image={el} title={this.state.project.title}/>
					</li>
					)
			});

			return outputObj;
		}
	}

	renderProjectContent() {
		if (this.state.project.content) {
			return {__html: this.state.project.content};
		}
	}

	render() {

	    if (this.state.isLoading) {
	    	return (
	    		<div><h1>Loading</h1></div>
	    		)
	    } else {
	    	return (
	    		<div className="project-detail">
					<Helmet>
						<title>Dominic Gan | {this.state.project.title}</title>
					</Helmet>
		    		<h1>Detail</h1>
		    		<article>
			    		<header>
				    		<h2>{this.state.project.title}</h2>
				    		<ul>
					    		<li>{this.state.project.attribution}</li>
					    		<li>{this.state.project.client}</li>
				    		</ul>
			    		</header>
			    		<ul className='images images--cover'>
				    		<li><ProjectPicture baseUrl={this.state.baseUrl} image={this.state.project.coverImage} title={this.state.project.title}/></li>
				    		{/*<li><ProjectPicture baseUrl={this.state.baseUrl} image={this.state.project.coverImageIndex} title={this.state.project.title}/></li>*/}
			    		</ul>
			    		<ul>
				    		<li><time dateTime={this.state.project.date}>{this.state.project.date}</time></li>
				    		<li><a href={this.state.project.link} target='_blank' rel='noopener noreferrer'>Visit Site</a></li>
			    		</ul>
			    		<ul>{this.renderCategories()}</ul>
			    		<main dangerouslySetInnerHTML={this.renderProjectContent()}></main>
			    		<hr/>
			    		<ul className='images'>{this.renderImagesArray()}</ul>
		    		</article>
					{/*<code>{JSON.stringify(this.state.project)}</code>*/}
		    		<Link to='/projects'>Back to projects</Link>
	    		</div>
		    );
	  }
  }
}

/**
 * Create a <picture> element that maps image data into sources
 */
export class ProjectPicture extends Component {
	render() {
		return (
				<picture>
					<source srcSet={this.props.baseUrl + this.props.image.sm} media="(min-width: 320px)"/>
					<source srcSet={this.props.baseUrl + this.props.image.md} media="(min-width: 576px)"/>
					<source srcSet={this.props.baseUrl + this.props.image.lg} media="(min-width: 768px)"/>
					<source srcSet={this.props.baseUrl + this.props.image.src} media="(min-width: 1024px)"/>
					<img src={this.props.baseUrl + this.props.image.xs} alt={this.props.title}/>
				</picture>
			)
	}
}

// class ProjectDetail extends Component {
// 	render() {}
// }

// class ProjectDetail extends Component {
// 	render() {}
// }

// class ProjectDetail extends Component {
// 	render() {}
// }

export default ProjectDetail;