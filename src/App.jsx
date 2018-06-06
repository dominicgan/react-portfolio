import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import Main from './Main.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
	  <div className="App">
		<header className="App-header">
		  <nav>
		<ul>
		<li><Link to='/'>Home</Link></li>
		<li><Link to='/projects'>Listing</Link></li>
		<li><Link to='/projects/swimfast'>Proj_1</Link></li>
		<li><Link to='/projects/ong-ong-group'>Proj_2</Link></li>
		<li><Link to='/resume'>Bio</Link></li>
		</ul>
		  </nav>
		</header>
		<Main />
	  </div>
    );
  }
}

export default App;
