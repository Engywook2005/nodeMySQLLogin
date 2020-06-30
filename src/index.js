import ReactDOM from 'react-dom';
import React from 'react';
import App from './jsx/App';
import api from './api';

const appName = 'app';

api(window[appName], appName);

ReactDOM.render(<App />, document.getElementById('app'));
