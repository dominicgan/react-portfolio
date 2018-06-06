import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import ProjectListing from './ProjectListing.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import Resume from './Resume.jsx';
 
class Main extends Component {
  render() {
    return (
	  <div className="main">
		<Switch>
			<Route exact path='/' render={(props) => (
				<div className='home'>
					<Helmet>
						<title>Dominic Gan | Home</title>
					</Helmet>
					<h1>Home</h1>
					<p>Hello World</p>
				</div>
			)}/>
			<Route exact path='/projects' component={ProjectListing}/>
			<Route exact path='/resume' component={Resume}/>
			<Route path='/projects/:id' component={ProjectDetail}/>
		</Switch>
	  </div>
    );
  }
}

export default Main;
