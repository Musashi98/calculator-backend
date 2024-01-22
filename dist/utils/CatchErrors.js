"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchErrors = (func) => {
    return (req, res, next) => {
        func(req, res, next)
            .then()
            .catch((e) => {
            console.log(`[error]: ${e}`);
            next(e);
        });
    };
};
exports.default = catchErrors;
