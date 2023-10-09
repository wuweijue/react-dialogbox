import React from 'react';
import './explain.less';

const Explain = () => {
    return <ul className='explain'>
        <h3>问题与意见</h3>
        <li>
            建议通过提交 issue 的方式表达您的诉求与反馈，当然也欢迎通过邮件交流
        </li>
        <br></br>
        <li>
            本人邮箱：awuweijue@163.com
        </li>
        <br></br>
        <li>
            项目地址：<a target="_blank" href='https://github.com/wuweijue/react-dialogbox'>https://github.com/wuweijue/react-dialogbox</a>
        </li>
        <br></br>
        
        <h3>关于 React 版本</h3>
        <li>
            虽然我很乐意将 React 依赖升级至最新版本，但考虑到大部分开发者使用的并非 18+ 的最新版本，为了兼容性，所以 react-dialogbox 2+ 的 React 仍保留在 16.8 + 的旧版本
        </li>
        <br></br>
        <li>
            但是最新的 react-dialogbox 3+ 版本采用了 18+ 的 react，使用 FunctionComponent + Hooks 的语法重写， 并且采用了 Provider 内嵌的构造，不再通过原生 DOM api 创建对话框，与 React 的理念更加契合，同时也使得 Redux Mobx 等需要 Provider 包裹的工具能够在 api 生成的 Dialogbox 起作用
        </li>
        <br></br>
        <h3>关于样式</h3>
        <li>
            当前版本将不再打包 css 文件，改为 css in js 的方式，直接使用，无需另外引入
        </li>
        <br></br>
        <h3>其它框架</h3>
        <li>
            如果你需要其它框架的 dialog box，我还提供了基于 Vue3 的 vue3-dialogbox
        </li>
        <br></br>
        
    </ul>
}

export default Explain