export default class IDialogboxMethod {

    /**
     * @description 在页面中展示一个弹窗
     * @param dialogbox 弹窗组件  
     * @param options IOptions对象
     * @returns IDialogbox对象
     */
    public showDialogbox(dialogbox: JSX.Element, options?:IOptions): IDialogbox

    /**
     * @description 在页面中展示一个弹窗
     * @param options IOpenOptions对象
     * @returns IDialogbox对象
     */
    public open(options:IOpenOptions): IDialogbox

    /**
     * @description 关闭某个指定的弹窗
     * @param dialogboxId 需要关闭的弹窗的id值
     */
    public hideDialogbox(dialogboxId: number): void

    /**
    * @description 强制关闭所有弹窗和根节点
    */
    public hideAllDialogbox(): void

    /**
    * @description 强制关闭所有弹窗和根节点
    */
    public setOption(options: IOptions): void

}

export interface IOptions {
    /**
     * 父节点容器
     */
    containerNode?: HTMLElement 
}

export interface IOpenOptions extends IOptions{

    header?: boolean

    maskClosable?: boolean

    children?: JSX.Element | string

    draggable?: boolean

    closable?: boolean

    fullScreen?: boolean

    mask?: boolean

    bodyStyle?: any 

    className?: string

    width?: number | string

    height?: number | string

    okText?: string | JSX.Element

    title?: string | JSX.Element

    cancelText?: string | JSX.Element

    footer?: string | JSX.Element | boolean

    afterClose?(): void

    onOk?(): void

    onCancel?(): void
}

export interface IDialogbox{

    /**
     * dialogbox本体的dom
     */
    DOM: HTMLElement

    /**
     * dialogbox的id值
     */
    dialogboxId: number

    /**
     * 关闭当前节点的方法
     */
    close(): void

    /**
     * 弹窗react元素
     */
    reactElement: JSX.Element
}