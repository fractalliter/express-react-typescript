import {Request, Response} from 'express';
import {IError} from '../domain/IError';
import path from '../route/path';
export default (req: Request, res: Response, next: (param?: unknown) => void): void => {
    
    if (path(req.url.slice(1, req.url.length)).methods.includes(req.method)) {
        next();   
    } else {
        const error: IError = {
            status: 403,
            message: "Wrong method!"
        }
        res.status(403).json(error)
    }
}
