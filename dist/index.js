"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Onion {
    constructor() {
        this.middleWares = [];
    }
    register(value) {
        const id = Symbol();
        this.middleWares.push({ id, value });
        return id;
    }
    cancel(id) {
        this.middleWares = this.middleWares.filter((v => v.id !== id));
    }
    run(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = (e) => { throw OnionError.new(e); };
            const mvArr = this.middleWares.map((v, i) => (ctx) => __awaiter(this, void 0, void 0, function* () {
                const mv = mvArr[i + 1];
                if (mv) {
                    return yield v.value(ctx, mv, error);
                }
                else {
                    return yield v.value(ctx, (value) => __awaiter(this, void 0, void 0, function* () { return value; }), error);
                }
            }));
            try {
                if (mvArr[0])
                    return yield mvArr[0](ctx);
                else
                    return ctx;
            }
            catch (e) {
                if (e instanceof OnionError) {
                    return e.valueOf();
                }
                else
                    throw e;
            }
        });
    }
}
exports.default = Onion;
class OnionError {
    constructor(e) { this.v = e; }
    static new(e) { return new this(e); }
    valueOf() { return this.v; }
}
const o = new Onion();
o.register((v, n, e) => __awaiter(this, void 0, void 0, function* () {
    e(1);
    return "w";
}));
(() => __awaiter(this, void 0, void 0, function* () {
    console.log(yield o.run("r"));
}))();
//# sourceMappingURL=index.js.map