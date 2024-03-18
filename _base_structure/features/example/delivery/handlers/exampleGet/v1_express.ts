import {Express, Request, Response} from 'express';
import {ExampleDelivery, GetExampleUseCase} from '@domain/example';
import {authorizationV1Express} from '@features/example/delivery/middlewares/authorization/v1_express';
import {presenterJSONOk, presenterJSONNotOk} from '@features/example/utility/presenterJSON';

export class ExampleGetV1Express implements ExampleDelivery {
    private readonly client: Express;
    private readonly getExample: GetExampleUseCase;

    constructor(client: Express, getExample: GetExampleUseCase) {
        this.client = client;
        this.getExample = getExample;
    }

    registerHandler(method: string, endpoint: string) {
        // @ts-ignore
        this.client[method.toLowerCase()](endpoint, authorizationV1Express, this.handler());
    }

    private handler(req: Request, res: Response) {
        const getExample = this.getExample;

        return function (req: Request, res: Response) {
            try {
                const [dto, err] = getExample.exec(1);

                if (err instanceof Error) {
                    res.json(presenterJSONNotOk('-1', 'error', err));
                    return;
                }

                res.json(presenterJSONOk('00', 'ok', dto!));
            } catch (err) {
                res.json(presenterJSONNotOk('-1', 'error', err instanceof Error ? err : new Error('general error')));
            }
        }
    }
}