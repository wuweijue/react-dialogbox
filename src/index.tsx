import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestComponent from './components/test';


const App = ()=>{
    return <TestComponent/>
}

ReactDOM.render(<App/>,document.getElementById('root'));