import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from "../utils/logger"

export default async(req: Request, res: Response, next: NextFunction) => {
    try{
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader){
            const token = authorizationHeader;
            const result = jwt.verify(token, process.env.JWT_SECRET, {});
            req.user = result;
			next();
            // res.send(result);
        } else {
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }
    } catch (error: any){
        res.status(400).send(error.message);
        logger.error(error.message);
    }
}