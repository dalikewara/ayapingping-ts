import {Example, ExampleRepository} from '@domain/example';

export class RepositoryMySQL implements ExampleRepository {
    private readonly db: null;

    constructor(db: null) {
        this.db = db;
    }

    findByID(id: number): [Example | null, Error | null] {
        try {
            let example = new Example({
                id:id,
                username: 'dalikewara',
                password: 'admin123'
            });

            example.setCreatedAtNow();

            return [example, null];
        } catch (err) {
            return [null, err instanceof Error ? err : new Error('general error')];
        }
    }
}