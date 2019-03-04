import { Ctx } from '../../types'

export default async function (input: Ctx, next: (ctx: Ctx) => Promise<Ctx>) :Promise<Ctx>{
    const [option, param, r] = input

    if (option.data && typeof option.data == 'object') {
        param.data = JSON.stringify(option.data)
    } else if (option.data) {
        param.data = option.data.toString()
    } else {
        param.data = 'null'
    }

    const [o, p, response] = await next(input)


    if(o.type == 'json'){
        
        const {
            Success,
            Code,
            Message,
            Data
        } = JSON.parse(response.raw)
    
        response.code = Code
        response.message = Message,
        response.success = Success
        response.data = Data
    
    }

    
    return [o, p, response]
}