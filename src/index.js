import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss';
import ImperialValue from './utils/functions/feet-inches';

const inputs = [
    `12.5`,
    `1 0.5`,
    `1 .5`,
    `1 0 1/2`,
    `1' 0.5"`,
    `1' .5"`,
    `1' 0.5`,
    `1' .5`,
    `1' 1/2"`,
    `1' 1/2`,
    `1-0.5`,
    `1-.5`,
    `1-0 1/2`,
    `1'-0.5"`,
    `1'-.5"`,
    `1'-0.5`,
    `1'-.5`,
    `1'-1/2"`,
    `1'-1/2`,
    `12.5`,
    `12.5"`,
    `12 1/2`,
    `12 1/2"`,
    `0 12.5`,
    `0 12.5"`,
    `0 12 1/2`,
    `0 12 1/2"`,
    `0' 12.5`,
    `0'-12.5"`,
    `0'-12-1/2`,
    `0'-12-1/2"`,
    `0' 12 1/2`,
    `0' 12 1/2"`,
];

console.warn = () => { };
console.log(inputs.map(i => new ImperialValue(i)));

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(registration => registration.unregister());
