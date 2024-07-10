import { validateUsername } from '@common/validateUsername';
import { timeNowUTC } from '@common/timeNow';

export interface ExampleRepository {
    findByID(id: number): [Example | null, Error | null];
}

export interface ExampleUseCase {
    getDetail(id: number): [ExampleDTO1 | null, Error | null];
}

export interface ExampleHttpService {
    exampleDetail(method: string, endpoint: string): void;
}

export class Example {
    public id: number = 0;
    public username: string = '';
    public password: string = '';
    public createdAt: Date | null = null;

    constructor(obj?: {
        id?: number,
        username?: string,
        password?: string,
        createdAt?: Date | null,
    }) {
        if (obj) {
            Object.assign(this, obj);
        }
    }

    public setCreatedAtNow() {
        this.createdAt = timeNowUTC();
    }

    public validateUsername(): Error | null {
        return validateUsername(this.username);
    }
}

export type ExampleDTO1 = {
    id: number;
    username: string;
    createdAt: Date | null;
}

export function newDTO1(example: Example): ExampleDTO1 {
    return {
        id: example.id,
        username: example.username,
        createdAt: example.createdAt,
    }
}