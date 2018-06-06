import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './css/index.css'
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
