import {ExampleDTO1, FindExampleByIDRepository, GetExampleUseCase} from '@domain/example';

export class GetExampleV1 implements GetExampleUseCase {
    private readonly findExampleByID: FindExampleByIDRepository;

    constructor(findExampleByID: FindExampleByIDRepository) {
        this.findExampleByID = findExampleByID;
    }

    exec(id: number): [ExampleDTO1 | null, Error | null] {
        let [example, err] = this.findExampleByID.exec(id);

        if (err instanceof Error) {
            return [null, err];
        }

        return [example!.toDTO1(), null];
    }
}