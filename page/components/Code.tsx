import './code.less';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const EmbeddedClassComponentCode = (
    `
    import { Dialogbox } from 'react-dialogbox';
    import React from 'react';

    class App extends React.Component {

        state = {
            visible: false
        }

        show = ()=> {
            this.setState({ visible: true })
        }

        hide = ()=> {
            this.setState({ visible: false })
        }

        render() {
            return <div>
                <button onClick={this.showDialogbox}> react-dialogbox </button>
                <Dialogbox visible={this.state.visible} onCancel={this.hideDialogbox} />
            </div>
        }
    }
`
)

const EmbeddedFunctionComponentCode = (
    `
    import { Dialogbox } from 'react-dialogbox';
    import React, { useState } from 'react';
    
    const App = () => {
        const [ visible, setVisible ] = useState(false);

        return <div>
            <button onClick={() => setVisible(true)}> react-dialogbox </button>
            <Dialogbox visible={visible} onCancel={() => setVisible(true)} />
        </div>        
    }

`
)

const showDialogboxClassComponentCode = (
    `
    import { Dialogbox, showDialogbox, hideDialogbox } from 'react-dialogbox';
    import React from 'react';
    
    class App extends React.Component {

        dialogboxInstance

        close = ()=> {
            // 利用实例关闭 close this dialogbox by his instance
            this.dialogboxInstance.close(); 

            // 通过 hideDialogbox 方法关闭 close the dialog box using the hideDialogbox method 
            hideDialogbox(this.dialogboxInstance.dialogboxId);

            // 上述二选一 Either of the above
        }

        show = ()=> {
            // 方法返回一个实例对象 return a instance of Dialogbox
            this.dialogboxInstance = showDialogbox(<Dialogbox 
                title='showDialogbox'
                visible={true}
                onCancel={this.close}
            />)
        }

        render(){
            return <button onClick={this.show}> react-dialogbox </button>
        }
    }

`
)

const showDialogboxFunctionComponentCode = (
    `
    import { Dialogbox, showDialogbox, hideDialogbox } from 'react-dialogbox';
    import React, { useRef } from 'react';
    
    const App = () => {
        const dialogboxInstance = useRef();

        const close = ()=> {
            // 利用实例关闭 close this dialogbox by his instance
            dialogboxInstance.current.close();

            // 通过 hideDialogbox 方法关闭 close the dialog box using the hideDialogbox method 
            hideDialogbox(dialogboxInstance.current.dialogboxId);

            // 上述二选一 Either of the above 
        }

        const show = () => {
            // 方法返回一个实例对象 return a instance of Dialogbox
            dialogboxInstance.current = showDialogbox(<Dialogbox 
                title='showDialogbox'
                visible={true}
                onCancel={close}
            />);
        }

        return <button onClick={show}> react-dialogbox </button>      
    }

`
)

const openClassComponentCode = (
    `
    import { open, hideDialogbox } from 'react-dialogbox';
    import React from 'react';
    
    class App extends React.Component {

        dialogboxInstance

        close = ()=> {
            // 利用实例关闭 close this dialogbox by his instance
            this.dialogboxInstance.close(); 

            // 通过 hideDialogbox 方法关闭 close the dialog box using the hideDialogbox method 
            hideDialogbox(this.dialogboxInstance.dialogboxId);

            // 上述二选一 Either of the above
        }

        show = ()=> {
            // 接收 options 作为参数，options 基本等同于 props
            // 方法返回一个实例对象 return a instance of Dialogbox
            this.dialogboxInstance = open({
                title: 'showDialogbox',
                onCancel: this.dialogboxInstance.close,
            })
        }

        render(){
            return <button onClick={this.show}> react-dialogbox </button>
        }
    }

`
)

const openFunctionComponentCode = (
    `
    import { open, hideDialogbox } from 'react-dialogbox';
    import React, { useRef } from 'react';
    
    const App = () => {
        const dialogboxInstance = useRef();

        const show = ()=> {
            // 接收 options 作为参数，options 基本等同于 props
            // 方法返回一个实例对象 return a instance of Dialogbox
            dialogboxInstance.current = open({
                title: 'showDialogbox',
                onCancel: dialogboxInstance.current.close,
            })
        }

        const close = ()=> {
            // 利用实例关闭 close this dialogbox by his instance
            dialogboxInstance.current.close();

            // 通过 hideDialogbox 方法关闭 close the dialog box using the hideDialogbox method 
            hideDialogbox(dialogboxInstance.current.dialogboxId);

            // 上述二选一 Either of the above 
        }

        return <button onClick={show}> react-dialogbox </button>      
    }

`
)

const hideAllCode = (
    `
    import { hideAllDialogbox } from 'react-dialogbox';

    hideAllDialogbox();

`
)

const installCode = (
    `
    npm install react-dialogbox

    yarn add react-dialogbox

`
)

const setConfigCode = (
    `
    import { setOption } from 'react-dialogbox';

    setOption({
        // 设置 Dialogbox 在哪渲染
        dialogboxRoot: getElementById('dialogbox-root')
    })

`
)

const CodeView = () => {
    return <div className="codeView">
        <div className='install'>
            <h3 className='title'>安装 Install</h3>
            <SyntaxHighlighter language="shell" style={docco}>
                {installCode}
            </SyntaxHighlighter>
        </div>

        <div className="embedded">
            <h3>组件内嵌 Embedded</h3>
            <div className="embedded-content">
                <div className="left">
                    <h4>类组件 ClassComponent</h4>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {EmbeddedClassComponentCode}
                    </SyntaxHighlighter>
                </div>
                <div className="right">
                    <h4>函数组件 FunctionComponent</h4>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {EmbeddedFunctionComponentCode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>

        <div className="embedded">
            <h3>showDialogbox Api</h3>
            <div className="embedded-content">
                <div className="left">
                    <h4>类组件 ClassComponent</h4>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {showDialogboxClassComponentCode}
                    </SyntaxHighlighter>
                </div>
                <div className="right">
                    <h4>函数组件 FunctionComponent</h4>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {showDialogboxFunctionComponentCode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>

        <div className="embedded">
            <h3>open Api</h3>
            <div className="embedded-content">
                <div className="left">
                    <h4>类组件 ClassComponent</h4>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {openClassComponentCode}
                    </SyntaxHighlighter>
                </div>
                <div className="right">
                    <h4>函数组件 FunctionComponent</h4>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {openFunctionComponentCode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>

        <div className='install'>
            <h3 className='title'>关闭所有对话框 close all dialogboxes </h3>
            <SyntaxHighlighter language="javascript" style={docco}>
                {hideAllCode}
            </SyntaxHighlighter>
        </div>

        <div className='install'>
            <h3 className='title'>设置全局配置 </h3>
            <SyntaxHighlighter language="javascript" style={docco}>
                {setConfigCode}
            </SyntaxHighlighter>
        </div>

    </div>
}

export default CodeView