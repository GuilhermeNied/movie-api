import { Router } from 'express'
import { movieController } from '../controllers/movieControllers'

const movieRouter = Router()

movieRouter.post('/', movieController.insertMovie)
movieRouter.get('/', movieController.listMovies)
movieRouter.get('/stars', movieController.getMoviesStars)
movieRouter.get('/:id', movieController.getMovie)

movieRouter.delete('/:id', movieController.deleteMovie)
movieRouter.put('/:id', movieController.updateMovie)

export { movieRouter }
