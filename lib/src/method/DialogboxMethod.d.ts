export default interface IDialogboxMethod {

    /**
     * @description 在页面中展示一个对话框
     * @param dialogbox 对话框组件  
     * @param options IOptions对象
     * @returns IDialogbox对象
     */
    showDialogbox(dialogbox: JSX.Element, options?:IOptions): IDialogbox

    /**
     * @description 在页面中展示一个对话框
     * @param options IOpenOptions对象
     * @returns IDialogbox对象
     */
    open(options:IOptions): IDialogbox

    /**
     * @description 关闭某个指定的对话框
     * @param dialogboxId 需要关闭的对话框的id值
     */
    hideDialogbox(dialogboxId: number): void

    /**
    * @description 强制关闭所有对话框和根节点
    */
    hideAllDialogbox(): void

    /**
    * @description 设置全局配置
    * @param options IOpenOptions对象
    */
    setOption(options: IOptions): void

}

export interface IOptions {

    isModal?: boolean

    containerNode?: HTMLElement 

    header?: boolean

    maskClosable?: boolean

    children?: JSX.Element | string

    draggable?: boolean

    fullScreen?: boolean

    mask?: boolean

    bodyStyle?: any 

    className?: string

    width?: number | string

    height?: number | string

    okText?: string | JSX.Element

    title?: string | JSX.Element

    cancelText?: string | JSX.Element

    footer?: string | JSX.Element | boolean | null

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
     * 对话框react元素
     */
    reactElement: JSX.Element
}