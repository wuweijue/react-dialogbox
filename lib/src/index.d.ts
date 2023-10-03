export { default as Dialogbox } from './Dialogbox.d';

import DialogboxMethod from './method/DialogboxMethod.d';

export const open: DialogboxMethod["open"];

export const showDialogbox: DialogboxMethod["showDialogbox"];
export const hideDialogbox: DialogboxMethod["hideDialogbox"];
export const setOption: DialogboxMethod["setOption"];

declare const dialogboxMethod: DialogboxMethod;

export default dialogboxMethod