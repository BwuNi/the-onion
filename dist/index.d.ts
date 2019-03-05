export default class Onion<T, E> {
    middleWares: ({
        id: symbol;
        value: (value: T, next: (ctx: T) => Promise<T>, error: (e: E) => void) => Promise<T>;
    })[];
    register(value: (value: T, next: (ctx: T) => Promise<T>, error: (e: E) => void) => Promise<T>): symbol;
    cancel(id: Symbol): void;
    run(ctx: T): Promise<T | E>;
}
