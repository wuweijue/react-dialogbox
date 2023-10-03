import * as React from 'react';
import IDialogboxStore from './store/DialogboxStore.d';

export type IDialogboxProps = {

    byOpen?: boolean

    store?: IDialogboxStore

    isModal?: boolean

    fullScreen?: boolean

    visible?: boolean

    draggable?: boolean

    maskClosable?: boolean

    mask?: boolean

    dialogboxStyle?: React.CSSProperties,

    headerStyle?: React.CSSProperties,

    bodyStyle?: React.CSSProperties,

    footerStyle?: React.CSSProperties

    className?: string

    header?: boolean

    width?: number | string

    height?: number | string

    okText?: string | JSX.Element

    title?: string | JSX.Element

    cancelText?: string | JSX.Element

    footer?: string | JSX.Element | boolean

    beforeMaskClick?(event?: React.SyntheticEvent): undefined | boolean

    afterMaskClick?(event?: React.SyntheticEvent)

    beforeDragMove?(event?: MouseEvent): undefined | boolean

    afterDragMove?(event?: MouseEvent)

    beforeDragScale?(event?: MouseEvent): undefined | boolean

    afterDragScale?(event?: MouseEvent)

    beforeExtend?(event?: MouseEvent): undefined | boolean

    afterExtend?(event?: MouseEvent)

    afterClose?(): void

    onOk?(): void

    onCancel?(): void

    children?: JSX.Element | string

}

export default function Dialogbox(props: Omit<IDialogboxProps, 'byOpen'>): JSX.Element