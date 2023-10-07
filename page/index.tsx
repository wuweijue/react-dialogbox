import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './public-path';

function render(props) {
    const { container } = props;
    ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('[react16] react app bootstraped');
}

export async function mount(props) {
    render(props);
}

export async function unmount(props) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
