import { validateUsername } from '@common/validateUsername';
import { timeNowUTC } from '@common/timeNow';

export interface FindExampleByIDRepository {
    exec(id: number): [Example | null, Error | null];
}

export interface GetExampleUseCase {
    exec(id: number): [ExampleDTO1 | null, Error | null];
}

export interface ExampleDelivery {
    registerHandler(method: string, endpoint: string): void;
}

export type ExampleDTO1 = {
    id: number;
    username: string;
    createdAt: Date | null;
}

export type ExamplePresenterJSON = {
    code: string;
    message: string;
    data: any;
    errors: string[];
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

    public toDTO1(): ExampleDTO1 {
        return {
            id: this.id,
            username: this.username,
            createdAt: this.createdAt
        };
    }
}