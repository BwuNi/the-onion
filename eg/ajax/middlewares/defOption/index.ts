import { Ctx } from '../../types'

export default async function(ctx:Ctx, next: (ctx: Ctx) => Promise<Ctx>){
    
    


    return await next(ctx)
}