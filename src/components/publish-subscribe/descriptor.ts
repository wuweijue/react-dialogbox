import { Observable, createObservableObject } from './observable';
import autorun from './autorun';

export function observable(target,keyname,descriptor?):any {
    const val = descriptor && descriptor.initializer();
    if(typeof val === 'object'){
        createObservableObject(val)
    }
    const observable = new Observable(val);
    return {
        enumerable:true,
        get: function(){
            return observable.get()
        },
        set: function(value){
            return observable.set(value)
        }
    }
}

export function observer(target){
    const componentWillMount = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function(){
        componentWillMount && componentWillMount.call(this)
        autorun(()=>{
            this.render();
            this.forceUpdate()
        })
    }
}
