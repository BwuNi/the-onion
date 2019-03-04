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
        const mvArr = this.middleWares.map((v, i, a) => (ctx) => __awaiter(this, void 0, void 0, function* () {
            const mv = mvArr[i + 1];
            if (mv)
                return yield mv(ctx);
            else
                return ctx;
        }));
        if (mvArr[0])
            return mvArr[0](ctx);
        else
            return ctx;
    }
}
exports.default = Onion;
//# sourceMappingURL=index.js.map