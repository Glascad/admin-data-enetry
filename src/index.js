import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss';
import { unregister } from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

unregister();
