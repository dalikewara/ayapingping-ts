export type ResponseJSON = {
    status: boolean;
    message: string;
    data: any;
    errors: string[];
}

export function newResponseJSONSuccess(data: any): ResponseJSON {
    return {
        status: true,
        message: "ok",
        data: data,
        errors: []
    };
}

export function newResponseJSONError(err: Error): ResponseJSON {
    return {
        status: false,
        message: "error",
        data: {},
        errors: [err.message]
    };
}