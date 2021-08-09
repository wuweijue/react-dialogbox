import * as ReactDOM from 'react-dom';
import * as React from 'react';
import DialogboxStore from '../store/DialogboxStore';
import IDialogboxMethod, { IDialogbox, IOpenOptions, IOptions } from './DialogboxMethod.d';
import Dialogbox from '../Dialogbox';

class DialogboxMethod implements IDialogboxMethod {

    private options: IOptions = {
        containerNode: document.getElementById('root')
    }

    private createDialogbox(dialogbox, options) {

        const dialogboxId = DialogboxStore.maxZIndex + 1; //保证生成的dialogbox初始时在最上层
        const containerNode = options.containerNode || this.options.containerNode;

        let dialogboxRoot = document.querySelector('#dialogbox-root');
        //若不存在#dialogbox-root根节点，则创建一个用于承载dialogbox
        if (!dialogboxRoot) {
            dialogboxRoot = document.createElement('div');
            dialogboxRoot.setAttribute('id', 'dialogbox-root');
            containerNode.appendChild(dialogboxRoot);
        }

        //由于ReactDOM.render方法会清空内部元素，所以需要一个中间层wrapper用于渲染
        const dialogboxWrapper = document.createElement('div');
        dialogboxWrapper.setAttribute('id', `dialogbox-wrapper-${dialogboxId}`);
        dialogboxWrapper.setAttribute('class', 'dialogbox-wrapper');
        dialogboxRoot.appendChild(dialogboxWrapper);

        //利用ReactDOM渲染dialogbox
        const reactElement = (ReactDOM.render(dialogbox, document.getElementById('dialogbox-wrapper-' + dialogboxId)) as any);

        return {
            DOM: document.getElementById('dialogbox-' + dialogboxId),
            dialogboxId,
            close: () => this.hideDialogbox(dialogboxId),
            reactElement
        };
    }

    /**
        * @description 在页面中展示一个弹窗
        * @param options
        * @returns IDialogbox {
        *   DOM,
        *   dialogboxId, 
        *   close, 关闭dialogbox的方法
        *   reactElement dialogbox组件
        * }
        */
    public open(options:IOpenOptions): IDialogbox {
        let dialogboxId = DialogboxStore.maxZIndex + 1;
        const dialogbox = <Dialogbox visible={true} store={DialogboxStore} 
            onOk={()=>{
                this.hideDialogbox(dialogboxId)
            }} 
            onCancel={()=>{
                this.hideDialogbox(dialogboxId)
            }} 
            {...options}
        > 
            { options && options.children }
        </Dialogbox>
        return this.createDialogbox(dialogbox, options || {})
    }

    /**
        * @description 在页面中展示一个弹窗
        * @param dialogbox 弹窗组件
        * @returns IDialogbox {
        *   DOM,
        *   dialogboxId, 
        *   close, 关闭dialogbox的方法
        *   reactElement dialogbox组件
        * }
        */
    public showDialogbox(dialogbox: JSX.Element, options = {
        containerNode: document.body
    }): IDialogbox {
        return this.createDialogbox(dialogbox, options)
    }

    /**
        * @description 关闭某个指定的弹窗
        * @param dialogboxId 需要关闭的弹窗的id值
        */
    public hideDialogbox(dialogboxId: number): void {

        const dialogboxWrapperDOM = document.querySelector('#dialogbox-wrapper-' + dialogboxId)
        if (dialogboxWrapperDOM) {
            const dialogboxDOM = document.querySelector('#dialogbox-' + dialogboxId);
            const dialogboxClassName = dialogboxDOM.className;
            const dialogboxRootDOM = document.querySelector('#dialogbox-root');
            if (!dialogboxClassName.includes('dialogbox-animation-out')) {
                dialogboxDOM.className += ' dialogbox-animation-out'
            }

            //设置定时器延时卸载组件是为了展示关闭弹窗的动画效果
            setTimeout(() => {
                //手动卸载react组件，目的是触发内部组件componentWillUnmount生命周期函数
                ReactDOM.unmountComponentAtNode(dialogboxWrapperDOM);
                dialogboxRootDOM.removeChild(dialogboxWrapperDOM);
                //若#dialogbox-root内弹窗均已关闭，则移除该元素
                if (!document.querySelectorAll('.dialogbox-wrapper').length) {
                    dialogboxRootDOM.parentNode.removeChild(dialogboxRootDOM)
                }
            }, 300);
        } else {
            console.warn('不存在dialogboxId为' + dialogboxId + '的dialogbox')
        }
    }

    /**
        * @description 强制关闭所有弹窗和根节点
        */
    public hideAllDialogbox(): void {
        let dialogboxRootDOM = document.querySelector('#dialogbox-root');
        dialogboxRootDOM.parentNode.removeChild(dialogboxRootDOM);
    }

    /**
        * @description 设置默认的配置项
        */
    public setOption(options:IOptions): void {
        this.options = { ...this.options, ...options }
    }

}

export default (window as any).dialogbox = new DialogboxMethod();