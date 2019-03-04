import * as uid from 'uuid/v4'

export default class Onion<T> {

    middleWares: ({
        id: symbol,
        value: (value: T,next:(ctx:T)=>Promise<T> ) => Promise<T> 
    })[] = []

    register(
        value: (value: T,next:(ctx:T)=>Promise<T>) => Promise<T> 
    ) {
        const id = Symbol()
        this.middleWares.push({ id, value })
        return id
    }
    cancel(
        id: Symbol
    ) {
        this.middleWares = this.middleWares.filter((v => v.id !== id))
    }

    run(ctx:T){
        type MV = (value: T) => Promise<T> 

        const mvArr : MV[] = this.middleWares.map((v,i,a)=>async (ctx:T) => {
            

            const mv = mvArr[i+1]

            if(mv)
                return await mv(ctx)
            else
                return ctx

        })

        if(mvArr[0]) return mvArr[0](ctx)
        else return ctx
        
    }
}