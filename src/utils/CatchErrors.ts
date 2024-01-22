import { NextFunction, Request, Response } from "express";

const catchErrors = (func: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next)
            .then()
            .catch((e: any) => {
                console.log(`[error]: ${e}`)
                next(e)
            })
    }
}

export default catchErrors