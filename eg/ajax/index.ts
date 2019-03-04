import Onion from '../../src/index'
import { Ctx,Options,initCtx ,Data} from './types'
import mvs from './middlewares'


const onion = new Onion<Ctx>()

mvs.forEach(v=>{
    onion.register(v)
})

export default class Ajax {

    options: Options

    // 生成一个 Ajax 对象
    static new(...arg: []) {
        return new Ajax(...arg)
    }

    constructor() {
        this.options = initCtx({})[0]
    }

    async send(){
        const ctx:Ctx =initCtx({options:this.options})
        return (await onion.run(ctx))[2]
    }

    async get(){
        this.options.method = 'get'
        return await this.send()
    }
    
    async post(){
        this.options.method = 'post'
        return await this.send()
    }

    data(data:Data){
        this.options.data = data
    }

    path(path:string){
        this.options.path = path
    }

    url(url:string){
        this.options.url = url
    }

}

