import { Request, Response, NextFunction } from 'express'
import { registerUser, loginUser } from './authController'
import { checkRegisterParams } from '../../middleware/checks'
import expressValidator, { registerUserRules, loginUserRules } from '../../utils/expressValidator'

export default [
  {
    path: '/api/auth/register',
    method: 'post',
    handler: [
      checkRegisterParams,
      registerUserRules(),
      expressValidator,

      async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req
        
        try {
          const result = await registerUser(body.credentials)
          console.log(result)
          res.status(200).json(result)
        } catch (error) {
          next(error)
        }
      }
    ]
  },
  {
    path: '/api/auth/login',
    method: 'post',
    handler: [
      checkRegisterParams,
      loginUserRules(),
      expressValidator,

      async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req

        try {
          const result = await loginUser(body.credentials)

          res.status(200).json(result)
        } catch (error) {
          next(error)
        }

      }
    ]
  }
]
