"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeString = exports.removeExtraSpaces = void 0;
function removeExtraSpaces(str) {
    return str.replace(/^\s+|\s(?=\s)|\s$/g, "");
}
exports.removeExtraSpaces = removeExtraSpaces;
function normalizeString(str) {
    return str.trim().replace(/\s{2,}|(\r?\n)/g, " ");
}
exports.normalizeString = normalizeString;
//# sourceMappingURL=string.js.map