import * as React from 'react';
import './app.less';
import HomePage from './Demo';
import { hot } from 'react-hot-loader/root';

const App = () => {
    return <HomePage />
    
}

export default hot(App)