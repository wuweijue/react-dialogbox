import IDialogboxStore from './DialogboxStore.d';

class DialogboxStore implements IDialogboxStore {

    constructor() {
        // 注册键盘事件
        document.addEventListener('keydown', (event) => {

            if(this.getIsAllDialogboxHide()) return;

            // 找到此时被聚焦的对话框
            let focusId = this.getFocusItem().dialogboxId;
            let reactElement = this.findReactElement(focusId);

            if (!reactElement) return;

            if (event.key === 'Enter') {
                event.preventDefault();
                reactElement.props.onOk && reactElement.props.onOk();
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                reactElement.props.onCancel && reactElement.props.onCancel();
            }
        })
    }

    dialogboxList = [];

    // 获取当前被聚焦的元素
    getFocusItem(){
        return this.dialogboxList.length && this.dialogboxList[this.dialogboxList.length - 1]
    }

    // 当前被聚焦元素的层级，即最高层级
    focusZIndex = 1000;

    // 获取dialogboxId对应的对话框react对象
    findReactElement(dialogboxId) {
        const dialogbox = this.dialogboxList.find(item => {
            return item.dialogboxId == dialogboxId;
        });
        return dialogbox && dialogbox.reactElement;
    }

    // 注册新生成的对话框
    registerDialogbox(reactElement, mask, visible) {
        let dialogboxId = ++this.focusZIndex;
        this.dialogboxList.push({
            dialogboxId,
            reactElement,
            visible,
            mask
        });

        this.changeMask();

        return dialogboxId;
    }

    unRegisterDialogbox(dialogboxId) {
        const { idx } = this.getDialogboxById(dialogboxId);
        this.dialogboxList.splice(idx, 1);
        this.changeMask();
    }

    changeDialogboxVisible(dialogboxId, visible) {
        const { idx } = this.getDialogboxById(dialogboxId);
        this.dialogboxList[idx].visible = visible;
        this.changeMask();
    }

    // 当弹窗出现或隐藏时去同步遮罩层的状态
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

    // 判断是否当前所有对话框均已隐藏
    getIsAllDialogboxHide() {
        return this.dialogboxList.every(item => !item.visible)
    }

    // 判断是否当前所有对话框均已隐藏或无遮罩层
    getIsDialogboxMask() {
        return !!this.dialogboxList.find(item => item.visible && item.mask);
    }

    getDialogboxById(dialogboxId) {
        let idx = this.dialogboxList.findIndex(item => item.dialogboxId == dialogboxId);
        let item = this.dialogboxList[idx];
        return {
            idx,
            item
        }
    }

    // 聚焦后提升层级
    promoteZIndex(dialogboxId) {
        for (let i = 0; i < this.dialogboxList.length; i++) {
            if (this.dialogboxList[i].dialogboxId == dialogboxId) {
                let dialogbox = this.dialogboxList[i];
                this.dialogboxList.splice(i, 1);
                this.dialogboxList.push(dialogbox);
                break;
            }
        }
        return ++this.focusZIndex;
    }
}

export default new DialogboxStore();