import {ExamplePresenterJSON} from 'domain/example';

export function presenterJSONOk(code: string, message: string, data: any): ExamplePresenterJSON {
    return {
        code: code,
        message: message,
        data: data,
        errors: []
    };
}

export function presenterJSONNotOk(code: string, message: string, error: Error): ExamplePresenterJSON {
    return {
        code: code,
        message: message,
        data: {},
        errors: [error.message]
    };
}