import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function authHandling (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "Not authorized" });
    }
}