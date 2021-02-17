import {Request, Response} from 'express';
import {IError} from '../domain/IError';
import path from '../route/path';

// Check to see if the requested route has the requested method as well
export default (req: Request, res: Response, next: (param?: unknown) => void): void => {
    const route = path(req.url);
    if (route.methods.includes(req.method)) {
        next();   
    } else {
        const error: IError = {
            status: 405,
            message: "Method not allowed, YET!"
        }
        res.setHeader("allow", route.methods);
        res.status(405).json(error);
    }
}
