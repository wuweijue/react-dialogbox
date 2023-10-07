import * as React from 'react';
import Dialogbox from './Dialogbox';
// import Dialogbox from './DialogboxHook';
import dialogboxMethod from './method/DialogboxMethod';
import { IDialogboxProps } from './Dialogbox.d';

const DragDialogbox = (props: IDialogboxProps) => {
    const _props = { ...dialogboxMethod.options, ...props };
    return <Dialogbox {..._props} />
}

export const { open, showDialogbox, hideDialogbox, setOption } = dialogboxMethod;

export default dialogboxMethod;

export { DragDialogbox as Dialogbox };

