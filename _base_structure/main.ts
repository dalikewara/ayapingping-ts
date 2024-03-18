import {parseEnv} from '@common/env'
import {connectMySQL} from '@common/mysql'
import {expressServer} from '@common/expressServer'
import {FindExampleByIDMySQL} from '@features/example/repositories/findExampleByID/mysql'
import {GetExampleV1} from '@features/example/usecases/getExample/v1'
import {ExampleGetV1Express} from "@features/example/delivery/handlers/exampleGet/v1_express"


// Parse env

const [envCfg, envCfgErr] = parseEnv()

if (envCfgErr instanceof Error) {
    // throw envCfgErr
}

// Database connection

const [mysqlDB, mysqlDBErr] = connectMySQL(envCfg!.mysqlHost, parseInt(envCfg!.mysqlPort), envCfg!.mysqlUser, envCfg!.mysqlPass, envCfg!.mysqlDBName)

if (mysqlDBErr instanceof Error) {
    // throw mysqlDBErr
}

// Http server initialization

const [expressSrv, expressSrvErr] = expressServer()

if (expressSrvErr instanceof Error) {
    throw expressSrvErr
}

// Repositories

const findExampleByIDMySQL = new FindExampleByIDMySQL(mysqlDB!)

// Use cases

const getExampleV1 = new GetExampleV1(findExampleByIDMySQL)

// Register handlers

new ExampleGetV1Express(expressSrv!, getExampleV1).registerHandler('GET', '/api/v1/example/get')

// Start & listen application

expressSrv!.listen(envCfg!.restPort, function()  {
    console.log('Application is running on port: ' + envCfg!.restPort)
})