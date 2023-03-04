<h1><center>react-dialogbox</center></h1>
<h3><center>一个基于 React 的对话框 UI，搭配 Typescript 食用更佳！</center></h3>
<h3><center>A dialogbox Library Based on react, better with typescript!</center></h3>
<br>

<h3><a href="https://static-1acd801a-1752-4c44-b015-68e7a62c6e6b.bspapp.com/" target="_blank">Demo</a></h3>

<div>邮箱 Email：awuweijue@163.com</div>
<div>欢迎交流与提交bug  Welcome to communicate and submit bug</div>

<br>
<h3>
用途 ( Purpose )：
</h3>
<div>当你需要页面中需要展示一些额外的内容或交互，但又不想通过切换路由或影响原页面来实现，尝试使用这个对话框</div>
<div>Try to use this dialogbox when you need to show some extra content or interaction in a page, but you don't want to switch routes or affect the original page</div>

<br>
<h3>
基础功能 ( Basic usage )：
</h3>
<div>在原页面上层展示一个可操作的弹出窗口，支持模态与非模态两种类型，支持关闭隐藏等多种事件</div>
<div>Display an operable pop-up window on the upper layer of the original page, which supports both modal and modeless types, Supports closing, hiding events and more</div>

<br>
<h3>
进阶功能 ( Advanced functions )：
</h3>
<div>
1.支持对话框拖拽移动，边缘极限控制
2.支持对话框八向宽高拉伸
3.支持对话框全屏按钮，双击 header，拖拽到屏幕边缘去切换全屏/恢复默认状态
4.支持 esc(onCancel) 和 enter(onOk) 的键盘事件
5.支持非模态框的聚焦操作（多个窗口同时存在时，可以通过点击切换聚焦的对话框）
6.支持模态框的点击阴影关闭对话框
7.对话框拥有一系列的过渡动画及阴影效果
8.支持全局配置默认属性，一次配置全局生效
</div>
<div>
1. Support dialog box dragging and moving and edge limit control
2. The dialog box supports eight direction width height stretching
3. Support the full screen button in the dialog box. Double click the header and drag it to the edge of the screen to switch to full screen / restore the default state
4. Support ESC (OnCancel) and enter (OnOk) keyboard events
5. Support the focus operation of non modal box (when multiple windows exist at the same time, you can click to switch the focus dialog box)
6. Support the click shadow of modal box to close the dialog box
7. The dialog box has a series of transition animation and shadow effects
8. It supports global configuration of default attributes, and the configuration takes effect globally at one time
</div>

<br>
<h3>优化 ( Optimization )：</h3>
<div>
视觉：
对话框拥有入场和出场等一系列动画，使画面过渡更加柔顺
</div>
<div>
兼容性：
利用 webpack 实现了一系列 js 和 css 的兼容性处理
</div>
<div>
体积：除 react 外，全部原生实现，几乎没有额外的依赖，包体积极小，非常精简
</div>

<div>
Vision:
the dialogbox has a series of animations, such as entrance and exit, to make the transition more flexible
</div>
<div>
Compatibility: 
A series of compatibility processing between JS and CSS is realized by using webpack
</div>
<div>
Volume: Except for react, all native implementations, almost no additional dependencies, active and small inclusions, very compact
</div>

<br>
<h3>
使用指南 ( Usage )：
</h3>
<div>
以下示例非完整代码，仅作参考 The following example is incomplete code for reference only</div>
<br>
<h5>
下载 ( Install )：
</h5>

```shell
    npm i react-dialogbox

    yarn add react-dialogbox
```

<br>
<h5>
初始化 ( Initialization )：
</h5>

```typescript
/* 在根组件引入样式文件 */

import 'react-dialogbox/lib/dialogbox.css'; 

/* dialogbox会在第一次引入时挂载到window上，后续可通过window.dialogbox访问 */

import dialogbox from 'react-dialogbox';
```

<br>
<h5>
作为组件内嵌使用 ( Embedded as a component )：
</h5>

```typescript

import { Dialogbox } from 'react-dialogbox';

class Demo extends React.Components {

    state = {
        dialogboxVisible: false
    }

    render(){
        return <div>
            <Dialogbox 
                title='Dialogbox'
                visible={this.state.dialogboxVisible}
                onOk={handleOkCallback}
                onCancel={handleCancelCallback}
            >
                展示的内容 content displayed
            <Dialogbox/>

            <button onClick={()=>this.setState({
                dialogboxVisible: true
            })}>
                弹出对话框
            </button>
        </div>
    }
}
```

<br>
<h5>
通过 dialogbox 的 api 使用 (  Using the API of dialogbox )：
</h5>


```typescript

import { Dialogbox } from 'react-dialogbox';

class Demo extends React.Components {

    dialogboxInstance;

    openDialogbox(){
        /* 展示一个新的 dialogbox，返回实例对象（具体用法见 Api 说明 ）*/

        /* (1)：使用 dialogbox.openDialogbox 方法，传入一个 open 对象 */ 
        const dialogboxInstance = window.dialogbox.openDialogbox({
            title: '弹出对话框',
            children: '', 
            onOk: handleOkCallback,
            onCancel: handleCancelCallback
        })

        /* (2)：使用 dialogbox.showDialogbox 方法，参数为 Dialogbox 组件 */ 
        const dialogboxInstance = window.dialogbox.showDialogbox(
            <Dialogbox
                title='弹出对话框',
                onOk={handleOkCallback}
                onCancel={handleCancelCallback}
                visible={true} // 当使用 showDialogbox 方法时这是必须的
            >
                children
            <Dialogbox/>
        )

        /* 使用内部属性或通过回调函数传参保存实例 */
        this.dialogboxInstance = dialogboxInstance;
    }

    hideDialogbox(dialogboxInstance = this.dialogboxInstance){
        /* 关闭 dialogbox 的方法 */
                        
        /*方法一：通过创建 dialogbox 弹窗返回的实例对象中的 close 方法*/ 
        dialogboxInstance.close();

        /*方法二：通过 dialogbox 的 hideDialogbox方法，参数为 dialogboxId*/
        dialogbox.hideDialogbox(dialogboxInstance.dialogboxId); 

        /*方法三：通过 dialogbox 的 hideAllDialogbox 方法强制关闭所有弹窗*/
        dialogbox.hideAllDialogbox(); 
    }

    render(){
        return <div>	
            <button onClick={()=>this.openDialogbox()}>弹出对话框</button>
        </div>
    }
}
```

<br/>

<h3>API Document:</h3>

```typescript

    /* dialogbox 提供以下方法，第一次引用时会赋值给 window.dialogbox */
    (1) dialogbox
   
    /**
     * @description 在页面中展示一个对话框 Show a dialog box
     * @param Dialogbox 对话框组件 
     * @param option 配置项 : {
     *          containerNode: HTMLElement 渲染根节点的容器,默认是 body
     *      }
     * @returns dialogboxInstance 对话框实例 : {  
            DOM: HTMLElement, dialogbox 的 dom
            dialogboxId: string, 对话框 id
            close(): void, 关闭当前对话框的方法
        }
     */
    public showDialogbox(Dialogbox: JSX.Element, option?): dialogboxInstance

    /**
     * @description 关闭某个指定的对话框 Closes a specified dialog box 
     * @param dialogboxId 需要关闭的对话框的 id
     */
    public hideDialogbox(dialogboxId: string): void 

    /**
     * @description 强制关闭所有对话框及根节点 Force destroy all dialogbox
     */
    public hideAllDialogbox(): void

    /**
    * @description 设置全局的默认的配置项 Setting
    * @params option 等同于下文中 Dialogbox.props or params 可选属性
    */
    public setOption(option: IOption): void
```

```typescript

    /* 对话框组件 <Dialogbox {...props} /> 或 dialogbox.openDialogbox(params) */
    (2) Dialogbox.props or params 可选属性

    /**
     * @description 非模态或是模态的
     * @defaultValue false
     */
    isModal: boolean

    /**
     * @description dialogbox 是否可见 
     * @tips dialogbox.openDialogbox 方法不需要该属性
     * @tips dialogbox.showDialogbox 参数 Dialogbox 组件 props 中必填为 true
     * @defaultValue false
     */
    visible: boolean 

    /**
     * @description dialogbox 对话框是否需要 header
     * @defaultValue true
     */
    header: boolean

    /**
     * @description dialogbox 标题
     */
    title: string | JSX.Element

    /**
     * @description 确认按钮的回调事件
     */
    onOk(): void

    /**
     * @description 取消按钮的回调事件
     */
    onCancel(): void

    /**
     * @description 确认按钮的文字
     * @default 确认
     */
    okText: string | JSX.Element

    /**
     * @description 取消按钮的文字
     * @default 取消
     */
    cancelText: string | JSX.Element

    /**
     * @description 自定义的 footer，值为 false 时不显示 footer
     * @default 取消
     */
    footer: string | JSX.Element | boolean

    /**
     * @description 对话框的行内样式
     */
    bodyStyle: CSSStyleDeclaration 

    /**
     * @description 对话框额外的类名
     */
    className: string
 
    /**
     * @description 是否出现遮罩层
     * @defaultValue true
     */
    mask: boolean

    /**
     * @description 点击遮罩层是否关闭
     * @defaultValue false
     */
    maskClosable: boolean

    /**
     * @description 对话框是否可拖动
     * @defaultValue true
     */
    draggable: boolean

    /**
     * @description 是否支持键盘 esc 关闭和 enter 确认
     * @defaultValue false
     */
    keyboard: boolean

    /**
     * @description 是否全屏显示
     * @defaultValue false
     */
    fullScreen: boolean
  
    /**
     * @description dialogbox 层级，多层对话框时不建议使用 Not recommended!
     */
    zIndex: number
 
    /**
     * @description 弹窗关闭的回调
     */
    afterClose(): void
  
    /**
     * @description 弹窗初始宽度 default width
     * @defaultValue 400
     */
    width: number | % | number + px

    /**
     * @description 弹窗初始高度 default height
     * @defaultValue 180
     */
    height: number | % | number + px

```
