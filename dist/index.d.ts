export default class Onion<T> {
    middleWares: ({
        id: symbol;
        value: (value: T, next: (ctx: T) => Promise<T>) => Promise<T>;
    })[];
    register(value: (value: T, next: (ctx: T) => Promise<T>) => Promise<T>): symbol;
    cancel(id: Symbol): void;
    run(ctx: T): T | Promise<T>;
}
