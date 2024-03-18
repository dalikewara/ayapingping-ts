import {Example, FindExampleByIDRepository} from '@domain/example';
import {Pool} from 'mysql2';

export class FindExampleByIDMySQL implements FindExampleByIDRepository {
    private readonly db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    exec(id: number): [Example | null, Error | null] {
        try {
            let example = new Example({
                id:id,
                username: 'dalikewara',
                password: 'password'
            });

            example.setCreatedAtNow();

            return [example, null];
        } catch (err) {
            return [null, err instanceof Error ? err : new Error('general error')];
        }
    }
}