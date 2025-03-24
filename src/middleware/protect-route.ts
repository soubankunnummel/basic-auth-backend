

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protectRoute = async (req: Request | any, res: Response | any, next: NextFunction) => {
    try {
        // const token = req.headers.authorization;
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};

