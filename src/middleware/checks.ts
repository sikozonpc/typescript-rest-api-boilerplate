import { Request, Response, NextFunction } from 'express'
import { HTTP400Error } from '../utils/httpErrors'

export const checkRegisterParams = (req: Request,res: Response, next: NextFunction ) => {
  if (!req.body.credentials) {
    throw new HTTP400Error('Missing `credentials` object.')
  } else { 
    next()
  }
}
