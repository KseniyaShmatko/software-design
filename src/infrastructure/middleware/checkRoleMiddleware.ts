import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function checkRoleHandling(role: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return res.status(401).json({ message: "Not authorized" });
            }
            const token = authorizationHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Not authorized" });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
            if (!decoded || typeof decoded === 'string') {
                throw new Error("Invalid token");
            }
            if (decoded.role !== role) {
                return res.status(403).json({ message: "No access" });
            }
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({ message: "Not authorized" });
        }
    };
}