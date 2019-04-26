"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    toNumber: function toNumber(num) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        num = parseFloat(num);
        return isNaN(num) ? value : num;
    }
};