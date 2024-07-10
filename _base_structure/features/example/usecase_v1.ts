import {Example, ExampleDTO1, ExampleRepository, ExampleUseCase, newDTO1} from '@domain/example';

export class UseCaseV1 implements ExampleUseCase {
    private readonly exampleRepository: ExampleRepository;

    constructor(exampleRepository: ExampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    getDetail(id: number): [ExampleDTO1 | null, Error | null] {
        let [example, err] = this.exampleRepository.findByID(id);

        if (err instanceof Error) {
            return [null, err];
        }

        return [newDTO1(example!), null];
    }
}