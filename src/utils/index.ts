import { Router, NextFunction } from 'express'

type Wrapper = ((router: Router) => void)

/**
 * Function that grabs thie list of middlewares and applies it on a router.
 */
export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
  for (const f of middleware) {
    f(router)
  }
}

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void

type Route = {
  path: string,
  handler: Handler | Handler[],
  method: string,
}

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](path, handler)
  }
}
