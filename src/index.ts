

export default class Onion<T, E> {

    middleWares: ({
        id: symbol,
        value: (value: T, next: (ctx: T) => Promise<T>, error: (e: E) => void) => Promise<T>
    })[] = []

    register(
        value: (value: T, next: (ctx: T) => Promise<T>, error: (e: E) => void) => Promise<T>
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

    async run(ctx: T): Promise<T | E> {
        type MV = (value: T) => Promise<T>

        const error = (e: E) => { throw OnionError.new(e) }

        const mvArr: MV[] = this.middleWares.map((v, i) => async (ctx: T) => {

            const mv = mvArr[i + 1]

            if (mv)
                return await v.value(ctx, mv, error)
            else
                return await v.value(ctx, async (value: T) => value, error)

        })

        try {
            if (mvArr[0])
                return await mvArr[0](ctx)
            else
                return ctx
        } catch (e) {
            // 仅捕获 OnionError
            if (e instanceof OnionError)
                return <E>e.valueOf()
            else
                throw e
        }
    }
}


class OnionError<E>{
    v: E
    constructor(e: E) { this.v = e }
    static new<E>(e: E) { return new this<E>(e) }
    valueOf() { return this.v }
}


const o = new Onion<string, number>()

o.register(async (v, n, e) => {
    e(1)
    return "w"
});


(async () => {
    console.log(await o.run("r"))
})()
