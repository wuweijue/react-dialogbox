import IDialogboxStore, { dialogboxItem } from './DialogboxStore.d';
import { observable } from '../publish-subscribe';

class DialogboxStore implements IDialogboxStore {

    constructor() {
        // 注册键盘事件
        document.addEventListener('keydown', (event) => {

            if (this.getIsAllDialogboxHide()) return;

            // 找到此时被聚焦的对话框
            const focusId = this.getFocusItem().dialogboxId;
            const instance = this.findItemById(focusId);

            if (!instance) return;

            if (event.key === 'Enter') {
                event.preventDefault();
                this.validFunction(instance.onOk)
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                this.validFunction(instance.onCancel)
            }
        })

        const maskX = document.querySelector('.dialogbox-extend-mask-x')
        if(!maskX){
            const extendMaskDOMX = document.createElement('div');
            const extendMaskDOMY = document.createElement('div');
            extendMaskDOMX.className = 'dialogbox-extend-mask-x';
            extendMaskDOMY.className = 'dialogbox-extend-mask-y'; 
            document.body.appendChild(extendMaskDOMX);
            document.body.appendChild(extendMaskDOMY);
        }
    }

    validFunction = (callback, event?) => {
        if (!callback || typeof callback !== 'function') {
            return false
        }
        return callback(event)
    }

    dialogboxList: dialogboxItem[] = [];

    // 获取当前被聚焦的元素
    getFocusItem() {
        return ((this.dialogboxList.length && this.dialogboxList[this.dialogboxList.length - 1]) as dialogboxItem)
    }

    // 当前被聚焦元素的层级，即最高层级
    focusZIndex = 1000;

    // 获取dialogboxId对应的对话框react对象
    findItemById(dialogboxId: number) {
        return (this.dialogboxList.find(item => {
            return item.dialogboxId == dialogboxId;
        }) as dialogboxItem);
    }

    // 注册新生成的对话框
    registerDialogbox(props) {
        const { mask = true, visible, onOk, onCancel, isModal } = props;
        const dialogboxId = ++this.focusZIndex;
        this.dialogboxList.push({
            dialogboxId,
            visible,
            mask,
            onOk,
            onCancel,
            isModal
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
        if (visible == true) {
            this.promoteZIndex(dialogboxId)
        }
        this.changeMask();
    }

    // 当对话框出现或隐藏时去同步遮罩层的状态
    changeMask() {
        const dialogboxMaskDOM = document.querySelector('.dialogbox-mask');
        const isMask = this.getIsDialogboxMask();

        if (isMask) {
            if (!dialogboxMaskDOM) {
                const maskDOM = document.createElement('div');
                maskDOM.classList.add('dialogbox-mask');
                document.body.appendChild(maskDOM);
            } else {
                dialogboxMaskDOM.classList.remove('dialogbox-mask-out')
            }
        } else {
            if (dialogboxMaskDOM) {
                const maskOutDOM = document.querySelector('.dialogbox-mask-out');
                if (!maskOutDOM) {
                    dialogboxMaskDOM.classList.add('dialogbox-mask-out');
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