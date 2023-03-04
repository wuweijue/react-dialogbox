import * as React from 'react';
import IDialogboxStore from './store/DialogboxStore.d';

export interface IDialogboxProps {

    byOpen?: boolean

    store?: IDialogboxStore

    isModal?: boolean

    fullScreen?: boolean

    visible?: boolean

    draggable?: boolean

    maskClosable?: boolean

    mask?: boolean

    bodyStyle?: any 

    className?: string

    header?: boolean

    width?: number | string

    height?: number | string

    okText?: string | JSX.Element

    title?: string | JSX.Element

    cancelText?: string | JSX.Element

    footer?: string | JSX.Element | boolean,

    dialogboxStyle?: 'windows' | 'macos',

    afterClose?(): void

    onOk?(): void

    onCancel?(): void

}

export default class Dialogbox extends React.Component<IDialogboxProps>{
    render(): JSX.Element;
}