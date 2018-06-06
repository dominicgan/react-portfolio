import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

	renderImages() {
		if (this.state.project.images) {
			let outputObj = this.state.project.images.map((el,i) => {
				return (
					<li key={i}>
						<picture>
							<source srcSet={this.state.baseUrl + el.sm} media="(min-width: 768px)"/>
							<source srcSet={this.state.baseUrl + el.md} media="(min-width: 991pxpx)"/>
							<source srcSet={this.state.baseUrl + el.lg} media="(min-width: 1200px)"/>
							<source srcSet={this.state.baseUrl + el.src} media="(min-width: 1680px)"/>
							<img width='150' src={this.state.baseUrl + el.xs} alt={this.state.project.title}/>
						</picture>
					</li>
					)
			});

			return outputObj;
		}
	}

	renderCoverImage(obj) {
		if (obj) {
			return (
				<picture>
					<source srcSet={this.state.baseUrl + obj.sm} media="(min-width: 768px)"/>
					<source srcSet={this.state.baseUrl + obj.md} media="(min-width: 991pxpx)"/>
					<source srcSet={this.state.baseUrl + obj.lg} media="(min-width: 1200px)"/>
					<source srcSet={this.state.baseUrl + obj.src} media="(min-width: 1680px)"/>
					<img width='150' src={this.state.baseUrl + obj.xs} alt={this.state.project.title}/>
				</picture>
				)
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
		    		<h1>Detail</h1>
		    		<article>
			    		<header>
				    		<h2>{this.state.project.title}</h2>
				    		<ul>
				    		<li>{this.state.project.attribution}</li>
				    		<li>{this.state.project.client}</li>
				    		</ul>
			    		</header>
			    		<ul>
				    		<li>{this.renderCoverImage(this.state.project.coverImage)}</li>
				    		<li>{this.renderCoverImage(this.state.project.coverImageIndex)}</li>
			    		</ul>
			    		<ul>
				    		<li><time dateTime={this.state.project.date}>{this.state.project.date}</time></li>
				    		<li><a href={this.state.project.link} target='_blank' rel='noopener noreferrer'>Visit Site</a></li>
			    		</ul>
			    		<ul>{this.renderCategories()}</ul>
			    		<ul>{this.renderImages()}</ul>
			    		<main dangerouslySetInnerHTML={this.renderProjectContent()}></main>
			    		<hr/>
		    		</article>
		    		<Link to='/projects'>Back to projects</Link>
	    		</div>
		    );
				// <code>{JSON.stringify(this.state.project)}</code>
	  }
  }
}

export default ProjectDetail

