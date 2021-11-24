import * as React from 'react';
import Dialogbox from './Dialogbox';
import DialogboxStore from './store/DialogboxStore';
import dialogboxMethod from './method/DialogboxMethod';
import { IDialogboxProps } from './Dialogbox.d';

class DragDialogbox extends React.Component<IDialogboxProps>{
    
    render() {
        const props = {...dialogboxMethod.options,...this.props};
        return <Dialogbox store={DialogboxStore} {...props} />
    }
}

export default dialogboxMethod;

export { DragDialogbox as Dialogbox };

