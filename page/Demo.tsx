import * as React from 'react';
import Tab from './tab/Tab';
import Options from './components/Options';
import Code from './components/Code';
import Show from './components/Show';
import Api from './Api';

class DialogDemo extends React.Component {

    state = {
        activeKey: '3',
    }

    handleEditorChange = (newValue, e) => {
        try {
            let code = JSON.parse(newValue)
            this.setState({ ...code })
        } catch (error) {

        }

    }

    render() {
        const { activeKey } = this.state;

        const tabList = [
            {
                key: '0',
                title: '常用配置参考 Options',
                component: <Options />
            },
            {
                key: '1',
                title: '使用指南 Usage Guidelines',
                component: <Code />
            },
            {
                key: '2',
                title: '更多功能展示 More function display',
                component: <Show />
            },
            {
                key: '3',
                title: 'Api 总览 Overview',
                component: <Api />
            }
        ]

        return <div className='dialogDemo'>
            <Tab tabList={tabList} activeKey={activeKey} onChange={(key) => this.setState({ activeKey: key })} />
        </div>
    }
}

export default DialogDemo;

