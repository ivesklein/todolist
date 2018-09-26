import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import persistState from 'redux-localstorage'
import { applyMiddleware, createStore, compose } from 'redux';
import reducers from './reducers/reducer'

const enhancer = compose( persistState() )

const store = compose(applyMiddleware(...[]))(createStore)(reducers, enhancer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);
//registerServiceWorker();
