import * as React from 'react';
import Tab from './tab/Tab';
import Options from './components/Options';
import Code from './components/Code';
import Show from './components/Show';
import Api from './components/Api';
import { ConfigProvider, theme } from 'antd';
import Explain from './components/Explain';
class DialogDemo extends React.Component {

    state = {
        activeKey: '0',
        theme: 'dark'
    }

    handleEditorChange = (newValue, e) => {
        try {
            let code = JSON.parse(newValue)
            this.setState({ ...code })
        } catch (error) {

        }
    }

    componentDidMount(): void {
        window.globalActions && window.globalActions.onGlobalStateChange((newState, oldState) => {
            // 根据新的全局状态更新本地状态  
            this.setState({
                theme: newState.theme || 'dark'
            })
        });
    }

    render() {
        const { activeKey } = this.state;

        const tabList = [
            {
                key: '0',
                title: '配置示例',
                component: <Options theme={this.state.theme} />
            },
            {
                key: '1',
                title: '使用指南',
                component: <Code theme={this.state.theme}/>
            },
            {
                key: '2',
                title: '功能演示',
                component: <Show theme={this.state.theme}/>
            },
            {
                key: '3',
                title: '文档详细',
                component: <Api />
            },
            {
                key: '4',
                title: '补充说明',
                component: <Explain />
            }
        ]

        return <div className={`dialogDemo ${this.state.theme}`} >
            <ConfigProvider
                theme={{
                    algorithm: this.state.theme === 'dark' ? theme.darkAlgorithm : undefined
                }}
            >
                <Tab tabList={tabList} activeKey={activeKey} onChange={(key) => this.setState({ activeKey: key })} />
            </ConfigProvider>

        </div>
    }
}

export default DialogDemo;

