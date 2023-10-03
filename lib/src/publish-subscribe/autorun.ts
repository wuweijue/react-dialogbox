import controller from "./controller";

function autorun (handler){
    controller.currentObserver = handler;
    handler()
    controller.currentObserver = null;
}

export default autorun