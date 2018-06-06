import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import '../css/Resume.css';

class Resume extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'baseUrl': 'https://dominicgan.github.io/',
			'endpoint': 'resume.json'
		};
	}
  	componentDidMount() {
	  let src = this.state.baseUrl + this.state.endpoint;
	  fetch(src)
		.then((res) => res.json())
		.then((data) => {
			this.setState({'resume': data});
		});
  	}
	render() {
		let printResume = () => {
			if (this.state.resume) {
				return (
					<div className='resume__wrapper'>
						<h2>Basics</h2>
						<ResumeBio className='basic' bio={this.state.resume.basics} />
						<hr/>
						<h2>Education</h2>
						<ResumeBio className='education' bio={this.state.resume.education} />
						<hr/>
						<h2>Work</h2>
						<ResumeBio className='work' bio={this.state.resume.work} />
						<hr/>
						<h2>Skills</h2>
						<ResumeBio className='skills' bio={this.state.resume.skills} />
						<hr/>
						<h2>Language</h2>
						<ResumeBio className='languages' bio={this.state.resume.languages} />
						<code>{JSON.stringify(this.state.resume)}</code>
					</div>
				);
						// <ResumeBio className='all' baseUrl={this.state.baseUrl} bio={this.state.resume} />

			} else {
				return;
			}
		}
    return (
		<article className="resume">
			<Helmet>
				<title>Dominic Gan | Resume</title>
			</Helmet>
			<header>
				<h1>Bio</h1>
			</header>
			<div className="resume__container">
				{printResume()}
			</div>
		</article>
    );
  }
}

class ResumeBio extends Component {
	render() {
		let printBio = () => {
			if (this.props.bio) {
			let bioTable = Object.keys(this.props.bio).map((el, i) => {
				// if key (el) is number, dont print value
				let printTh = () => {
					if (!Number.isNaN(parseInt(el, 10))) {
						return (
							<th className='empty'></th>
							);
					} else return (
							<th>{el}</th>
						);
				}

				let outputRow;

				if (typeof this.props.bio[el] === 'string') {
					let printVal = () => {
						let output;

						switch (el) {
							case 'email':
								output = (
									<a href={'mailto:'+this.props.bio[el]}>{this.props.bio[el]}</a>
									)
								break;
							case 'url':
							case 'website':
								output = (
									<a href={this.props.bio[el]} target='_blank' rel='noopener noreferrer'>{this.props.bio[el]}</a>
									)
								break;
							case 'picture':
								output = (
									<img width='100' src={this.props.bio[el]} alt={el}/>
									)
								break;
							default:
								output = this.props.bio[el];
								break;
						};
						return output;
					};

					outputRow = (
						<tr key={i} data-section={el}>
							{printTh()}
							<td>{printVal()}</td>
						</tr>
						)
				} else {
					let lenData;
					// determine if is array or object
					if (Array.isArray(this.props.bio[el])) {
						lenData = this.props.bio[el].length;
					} else {
						lenData = Object.keys(this.props.bio[el]).length;
					}
					
					// don't print row if no data is present in subset
					if (lenData) {
						outputRow = (
							<tr key={i} data-section={el}>
								{printTh()}
								<td><ResumeBio className={this.props.className+'__'+el}  baseUrl={this.props.baseUrl} bio={this.props.bio[el]}/>
								</td>
							</tr>
							)
					}
				}

				return outputRow;
			});
			return (
				<table className={'resume__' + this.props.className}>
					<tbody>{bioTable}</tbody>
				</table>
				);
			}
		};
		return printBio();
	}
}

// class ResumeEdu extends Component {
// 	render() {
// 		return (<div>{JSON.stringify(this.props.education)}</div>);
// 	}
// }

// class ResumeWork extends Component {
// 	render() {
// 		return (<div>{JSON.stringify(this.props.work)}</div>);
// 	}
// }

// class ResumeSkills extends Component {
// 	render() {
// 		return (<div>{JSON.stringify(this.props.skills)}</div>);
// 	}
// }

// class ResumeLang extends Component {
// 	render() {
// 		return (<div>{JSON.stringify(this.props.languages)}</div>);
// 	}
// }
export default Resume
