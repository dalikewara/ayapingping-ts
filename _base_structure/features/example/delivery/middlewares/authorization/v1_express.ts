import {Request, Response, NextFunction} from 'express';
import {presenterJSONNotOk} from '@features/example/utility/presenterJSON';

export function authorizationV1Express(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (authorizationHeader) {
            console.log('Authorization header: ' + authorizationHeader);
        } else {
            console.log('No Authorization header provided');
        }

        next();
    } catch (err) {
        res.json(presenterJSONNotOk('-1', 'error', err instanceof Error ? err : new Error('general error')));
    }
}