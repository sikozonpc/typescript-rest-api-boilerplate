import express, { Application } from 'express'
import { applyMiddleware, applyRoutes } from '../utils'
import middlewares from '../middleware'
import Database from '../db/database'
import routes from '../plugins'
import errorHandlers from '../middleware/errorHandlers'

/**
 * Setup of the server configuration
 */
export default class Server {
  private static app: Application = express()

  public static bootstrap (): Application {
    this.configureServices()
    this.configureDatabase()
    this.configureMiddleware()
    this.configureRoutes()

    return this.app
  }

  private static configureServices () {

  }

  private static configureDatabase () {
    Database.mongoConnect()
  }

  private static configureMiddleware () {
    applyMiddleware(middlewares, this.app)
  }

  private static configureRoutes () {
    applyRoutes(routes as any, this.app)
    applyMiddleware(errorHandlers, this.app)
  }
}
