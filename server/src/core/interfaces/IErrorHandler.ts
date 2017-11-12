import {Request, Response, NextFunction} from "express";
import IError from "./IError";

interface IErrorHandler {
    (err: IError, req: Request, res: Response, next: NextFunction): void
}

export default IErrorHandler;
