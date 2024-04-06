import { Request, Response, NextFunction } from 'express';
import { ApiError } from "../error/ApiError";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export function errorHandling(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Unknown error' });
}
