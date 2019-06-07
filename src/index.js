import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss';
import ImperialValue from './utils/functions/feet-inches';

console.log(new ImperialValue(`1'-2-3/16"`));

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(registration => registration.unregister());
