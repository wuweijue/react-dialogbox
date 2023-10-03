import controller from "./controller";

class Observable {

    obid

    value

    constructor(val) {
        this.value = val
        this.obid = ++controller.curObid
    }

    get() {
        controller.collectObserver(this.obid);
        return this.value
    }

    set(value) {
        this.value = value;
        controller.trigger(this.obid)
        return true
    }
}

function createObservableObject(target) {
    Object.keys(target).forEach(key => {
        if (typeof target[key] === 'object') {
            createObservableObject(target[key])
        } else {
            const observable = new Observable(target[key]);
            Object.defineProperty(target,key,{
                get: function(){
                    return observable.get()
                },
                set: function(value){
                    observable.set(value)
                    return true
                }
            })
        }
    })
}

export { createObservableObject, Observable }