import IDialogboxStore from './DialogboxStore.d';

class DialogboxStore implements IDialogboxStore {

    constructor() {
        // document.addEventListener('keydown', (event) => {
        //     event.preventDefault();
        //     let focusId = this.dialogboxList.length && this.dialogboxList[this.dialogboxList.length - 1].dialogboxId;
        //     let reactElement = this.findReactElement(focusId)
        //     if (!reactElement) return false;
        //     if (event.keyCode == 13 || event.key == 'Enter') { //回车
        //         reactElement.props.onOk && reactElement.props.onOk();
        //     }

        //     if (event.keyCode == 27 || event.key == 'Escape') { //esc
        //         reactElement.props.onCancel && reactElement.props.onCancel();
        //     }
        // })
    }

    dialogboxList = [];

    maxZIndex = 1000;

    findReactElement(dialogboxId) {
        let reactElement;
        this.dialogboxList.forEach(item => {
            if (item.dialogboxId = dialogboxId) {
                reactElement = item.reactElement;
            }
        })

        return reactElement;
    }

    registerDialogbox(reactElement, mask, visible) {
        let dialogboxId = ++this.maxZIndex;
        this.dialogboxList.push({
            dialogboxId,
            reactElement,
            visible,
            mask
        });

        this.changeMask();

        return dialogboxId;
    }

    changeDialogboxVisible(dialogboxId, visible) {
        const { idx } = this.getDialogboxById(dialogboxId);
        this.dialogboxList[idx].visible = visible;
        this.changeMask()
    }

    unRegisterDialogbox(dialogboxId) {
        const { idx } = this.getDialogboxById(dialogboxId);
        this.dialogboxList.splice(idx, 1);
        this.changeMask()
    }

    changeMask() {
        const dialogboxMaskDOM = document.querySelector('.dialogbox-mask');
        const isMask = this.getIsDialogboxMask();

        if (!dialogboxMaskDOM) {
            const maskDOM = document.createElement('div');
            const extendMaskDOMX = document.createElement('div');
            const extendMaskDOMY = document.createElement('div');
            if(isMask){
                maskDOM.className = 'dialogbox-mask';
            }else{
                maskDOM.className = 'dialogbox-mask dialogbox-mask-out';
            }
            extendMaskDOMX.className = 'dialogbox-extend-mask-x';
            extendMaskDOMY.className = 'dialogbox-extend-mask-y';
            document.body.appendChild(maskDOM);
            document.body.appendChild(extendMaskDOMX);
            document.body.appendChild(extendMaskDOMY);
        }else{
            const maskOutDOM = document.querySelector('.dialogbox-mask-out');
            if(isMask){
                if(maskOutDOM){
                    dialogboxMaskDOM.className = 'dialogbox-mask'
                }
            }else{
                if(!maskOutDOM){
                    dialogboxMaskDOM.className = 'dialogbox-mask dialogbox-mask-out';
                }
            }
        }
    }

    getIsAllDialogboxHide() {
        return this.dialogboxList.every(item => !item.visible)
    }

    getIsDialogboxMask() {
        return !!this.dialogboxList.find(item => item.visible && item.mask);
    }

    private getDialogboxById(dialogboxId) {
        let idx = this.dialogboxList.findIndex(item => item.dialogboxId == dialogboxId);
        let item = this.dialogboxList[idx];
        return {
            idx,
            item
        }
    }

    promoteZIndex(dialogboxId) {
        for (let i = 0; i < this.dialogboxList.length; i++) {
            if (this.dialogboxList[i].dialogboxId == dialogboxId) {
                let dialogbox = this.dialogboxList[i];
                this.dialogboxList.splice(i, 1)
                this.dialogboxList.push(dialogbox)
                break;
            }
        }
        return ++this.maxZIndex;
    }
}

export default new DialogboxStore();