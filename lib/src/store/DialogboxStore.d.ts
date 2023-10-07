export interface dialogboxItem {
    dialogboxId: number,
    isModal: boolean,
    onOk(): void
    onCancel(): void,
    visible: boolean,
    mask: boolean
}

export default class IDialogboxStore {

    dialogboxList: dialogboxItem[]

    focusZIndex: number

    getFocusItem(): dialogboxItem

    registerDialogbox(props): number;

    unRegisterDialogbox(dialogboxId: number): void

    promoteZIndex(dialogboxId: number): void

    findItemById(dialogboxId: number): dialogboxItem

    changeDialogboxVisible(dialogboxId: number, visible: boolean): void

    getIsAllDialogboxHide(): boolean

}
