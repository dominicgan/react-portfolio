import React, { Component } from 'react';
import './Resume.css';

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
					<div className='resume__wrapper'>
						<ResumeBio className='all' baseUrl={this.state.baseUrl} bio={this.state.resume} />
						<code>{JSON.stringify(this.state.resume)}</code>
					</div>
				);
						// <ResumeBio className='basic' bio={this.state.resume.basic} />
						// <ResumeBio className='education' bio={this.state.resume.education} />
						// <ResumeBio className='work' bio={this.state.resume.work} />
						// <ResumeBio className='skills' bio={this.state.resume.skills} />
						// <ResumeBio className='languages' bio={this.state.resume.languages} />

						// <ResumeEdu education={this.state.resume.education} />
						// <ResumeWork work={this.state.resume.work}/>
						// <ResumeSkills skills={this.state.resume.skills}/>
						// <ResumeLang languages={this.state.resume.languages}/>
			} else {
				return;
			}
		}
    return (
	  <article className="resume">
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
						return '';
					} else {
						return el;
					};
				}

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
								output = (
									<a href={this.props.bio[el]} target='_blank' rel='noopener noreferrer'>{this.props.bio[el]}</a>
									)
								break;
							case 'website':
								output = (
									<a href={this.props.bio[el]} target='_blank' rel='noopener noreferrer'>{this.props.bio[el]}</a>
									)
								break;
							case 'picture':
								output = (
									<img src={'+'+this.props.bio[el]} alt={el}/>
									)
								break;
							default:
								output = this.props.bio[el];
								break;
						};
						return output;
					};

					return (
						<tr key={i} data-section={el}>
							<th>{printTh()}</th>
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
						return (
							<tr key={i} data-section={el}>
								<th>{printTh()}</th>
								<td><ResumeBio className={this.props.className+'__'+el}  baseUrl={this.props.baseUrl} bio={this.props.bio[el]}/>
								</td>
							</tr>
							)
					}
				}
			});
			return bioTable;
			}
		};
		return (<table className={'resume__' + this.props.className}><tbody>{printBio()}</tbody></table>);
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
