import {Express, Request, Response} from 'express';
import {ExampleHttpService, ExampleUseCase} from '@domain/example';
import {newResponseJSONSuccess, newResponseJSONError} from '@common/response';

export class HttpServiceExpress implements ExampleHttpService {
    private readonly client: Express;
    private readonly exampleUseCase: ExampleUseCase;

    constructor(client: Express, exampleUseCase: ExampleUseCase) {
        this.client = client;
        this.exampleUseCase = exampleUseCase;
    }

    detail(method: string, endpoint: string): void {
        const exampleUseCase = this.exampleUseCase;

        // @ts-ignore
        this.client[method.toLowerCase()](endpoint, function (req: Request, res: Response) {
            try {
                const [result, err] = exampleUseCase.getDetail(1);

                if (err instanceof Error) {
                    res.json(newResponseJSONError(err));
                    return;
                }

                res.json(newResponseJSONSuccess(result!));
            } catch (err) {
                res.json(newResponseJSONError(err instanceof Error ? err : new Error('general error')));
            }
        });
    }
}