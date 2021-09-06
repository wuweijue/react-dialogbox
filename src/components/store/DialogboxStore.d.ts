export default class IDialogboxStore {

    dialogboxList: dialogbox[]

    focusZIndex:number

    registerDialogbox(reactElement,mask,visible):void

    unRegisterDialogbox(dialogboxId: number):void

    promoteZIndex(dialogboxId: number):void

    findReactElement(dialogboxId: number): JSX.Element

    changeDialogboxVisible(dialogboxId: number, visible: boolean): void

    getIsAllDialogboxHide(): boolean

}

interface dialogbox {
    dialogboxId: number,
    reactElement: JSX.Element
}