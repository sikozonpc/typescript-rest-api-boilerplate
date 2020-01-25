import { Request, Response } from "express"

export default [
  {
    path: "/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.json({ 
        message: 'Hello world',
      })
    }
  }
]
