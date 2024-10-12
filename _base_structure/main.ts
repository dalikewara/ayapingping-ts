import {expressServer} from '@common/expressServer'
import {RepositoryMySQL as ExampleRepositoryMySQL} from '@features/example/repository_mysql'
import {UseCaseV1 as ExampleUseCaseV1} from '@features/example/usecase_v1'
import {HttpServiceExpress as ExampleHttpServiceExpress} from '@features/example/httpService_express'

// Http server initialization

const [expressSrv, expressSrvErr] = expressServer()

if (expressSrvErr instanceof Error) {
    throw expressSrvErr
}

// Repositories

const exampleRepository = new ExampleRepositoryMySQL(null)

// Use cases

const exampleUseCase = new ExampleUseCaseV1(exampleRepository)

// Services

const exampleHttpServiceExpress = new ExampleHttpServiceExpress(expressSrv!, exampleUseCase)

// Service handlers

exampleHttpServiceExpress.detail("GET", "/example")

// Start & listen application

expressSrv!.listen(8080, function()  {
    console.log('Application is running on port: ' + 8080)
})