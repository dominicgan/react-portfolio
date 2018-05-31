import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectListing from './ProjectListing.js';
import ProjectDetail from './ProjectDetail.js';
 
class Main extends Component {
  render() {
    return (
	  <div className="main">
		<Switch>
			<Route exact path='/' render={(props) => (
				<div className='home'>
				<h1>Home</h1>
				</div>
			)}/>
			<Route exact path='/projects' component={ProjectListing}/>
			<Route path='/projects/:id' component={ProjectDetail}/>
		</Switch>
	  </div>
    );
  }
}

export default Main;
