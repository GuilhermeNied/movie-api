import { Application, Router } from 'express'
import { movieRouter } from './movieRoutes'

export const useRoutes = (app: Application) => {
  const apiRouter = Router()
  apiRouter.use('/movies', movieRouter)

  app.use('/api/v1', apiRouter)
}
