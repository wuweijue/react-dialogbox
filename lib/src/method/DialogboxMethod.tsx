import * as ReactDOM from 'react-dom';
import * as React from 'react';
import DialogboxStore from '../store/DialogboxStore';
import IDialogboxMethod, { IDialogbox, IOptions } from './DialogboxMethod.d';
import Dialogbox from '../Dialogbox';

class DialogboxMethod implements IDialogboxMethod {

    options: IOptions = {}

    private createDialogbox = (dialogbox, options) => {

        const dialogboxId = DialogboxStore.focusZIndex + 1; //保证生成的dialogbox初始时在最上层
        const containerNode = options.containerNode || document.body;

        let dialogboxRoot = document.querySelector('#dialogbox-root');

        //若不存在#dialogbox-root根节点，则创建一个用于承载dialogbox
        if (!dialogboxRoot) {
            dialogboxRoot = document.createElement('div');
            dialogboxRoot.setAttribute('id', 'dialogbox-root');
            containerNode.appendChild(dialogboxRoot);                     
        }

        const maskX = document.querySelector('.dialogbox-extend-mask-x')
        if(!maskX){
            const extendMaskDOMX = document.createElement('div');
            const extendMaskDOMY = document.createElement('div');
            extendMaskDOMX.className = 'dialogbox-extend-mask-x';
            extendMaskDOMY.className = 'dialogbox-extend-mask-y'; 
            document.body.appendChild(extendMaskDOMX);
            document.body.appendChild(extendMaskDOMY);
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
        * @description 在页面中展示一个对话框，并以配置对象作为参数传入
        * @param options
        * @returns IDialogbox {
        *   DOM, 对话框对应的 dom 节点
        *   dialogboxId, 
        *   close, 关闭对话框的方法
        *   reactElement dialogbox 组件
        * }
        */
    public open = (options: IOptions = this.options): IDialogbox => {
        const dialogboxId = DialogboxStore.focusZIndex + 1;
        const dialogboxComponent = <Dialogbox
            visible={true}
            onOk={() => {
                this.hideDialogbox(dialogboxId)
            }}
            onCancel={() => {
                this.hideDialogbox(dialogboxId)
            }}
            byOpen={true}
            {...options}
        >
            {options.children}
        </Dialogbox>;
        return this.createDialogbox(dialogboxComponent, options)
    }

    /**
        * @description 在页面中展示一个对话框，并将对话框组件作为参数传入
        * @param dialogbox 对话框组件
        * @param options 
        * @returns IDialogbox {
        *   DOM,
        *   dialogboxId, 
        *   close, 关闭dialogbox的方法
        *   reactElement dialogbox组件
        * }
        */
    public showDialogbox = (dialogbox: JSX.Element, options = this.options): IDialogbox => {
        return this.createDialogbox(dialogbox, options)
    }

    /**
        * @description 关闭某个指定的对话框
        * @param dialogboxId 需要关闭的对话框的id值
        */
    public hideDialogbox = (dialogboxId: number): void => {
        const dialogboxRootDOM = document.querySelector('#dialogbox-root');
        const dialogboxWrapperDOM = document.querySelector('#dialogbox-wrapper-' + dialogboxId);
        const dialogboxDOM = document.querySelector('#dialogbox-' + dialogboxId);

        if (dialogboxWrapperDOM) {
            dialogboxDOM.classList.add('dialogbox-animation-out');

            setTimeout(() => {
                //手动卸载react组件，目的是触发内部组件componentWillUnmount生命周期函数
                ReactDOM.unmountComponentAtNode(dialogboxWrapperDOM);
                //设置定时器延时卸载组件是为了展示关闭对话框时的动画效果
                dialogboxRootDOM.removeChild(dialogboxWrapperDOM);

                //若#dialogbox-root内对话框均已关闭，则移除根节点
                if (!document.querySelectorAll('.dialogbox-wrapper').length) {
                    dialogboxRootDOM.parentNode.removeChild(dialogboxRootDOM)
                }
            }, 400);
        } else {
            console.warn('不存在dialogboxId为' + dialogboxId + '的对话框')
        }
    }

    /**
        * @description 强制关闭所有对话框，并移除其所在的根节点
        */
    public hideAllDialogbox(): void {
        const dialogboxRootDOM = document.querySelector('#dialogbox-root');
        if (dialogboxRootDOM) {
            DialogboxStore.dialogboxList.forEach(item => {
                const dialogboxWrapperDOM = document.querySelector('#dialogbox-wrapper-' + item.dialogboxId);
                ReactDOM.unmountComponentAtNode(dialogboxWrapperDOM);
            })
            dialogboxRootDOM.parentNode.removeChild(dialogboxRootDOM);
        } else {
            console.warn('当前并无显示的对话框')
        }
    }

    /**
        * @description 设置默认的配置项
        */
    public setOption = (options: IOptions): void => {
        this.options = { ...this.options, ...options }
    }

}

export default new DialogboxMethod();