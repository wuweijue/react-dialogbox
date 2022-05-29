class Controller {

    curObid = 0;
    observables = new Map();
    currentObserver = null;

    trigger(obid){
        this.observables.forEach((watchers,key)=>{
            if(key == obid){
                watchers && watchers.forEach(handler=>{
                    handler()
                }) 
            }
        })
    }

    collectObserver(obid){
        if(!this.currentObserver) return
        if(this.observables.has(obid)){
            this.observables.get(obid).add(this.currentObserver)
        }else{
            this.observables.set(obid,new Set([this.currentObserver]))
        }
    }
}

export default new Controller()