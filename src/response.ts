import express from 'express';

export class ResponseUtils {
    
    constructor () {
    }

    public static responseUnauthorized(res: express.Response): boolean {
        try {
            res.sendStatus(401);
            return true;
        } catch (e) {
            return false;
        }
        
    }

    public static responseSuccessJson(res: express.Response, data: any): boolean {
        try {
            res.json(data);
            return true;
        } catch (e) {
            return false;
        }
    }
}