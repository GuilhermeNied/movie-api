import { Router } from 'express'
import { movieController } from '../controllers/movieControllers'

const movieRouter = Router()

movieRouter.post('/insert', movieController.insertMovie)
movieRouter.get('/list', movieController.listMovies)
movieRouter.get('/getStars', movieController.getMoviesStars)
movieRouter.get('/getMovie/:id', movieController.getMovie)

movieRouter.delete('/delete/:id', movieController.deleteMovie)
movieRouter.put('/update/:id', movieController.updateMovie)

export { movieRouter }
