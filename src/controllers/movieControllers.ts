import { Request, Response } from 'express'

import { Movie, movieModel } from '../models/movieModels'
import {
  badRequest,
  internalServerError,
  notFound,
  validateNumber,
  ok
} from '../services/errorsTreatment'

const insertMovie = (req: Request, res: Response) => {
  {
    const movie = req.body
    if (!movie) {
      return badRequest(res, 'Filme inválido')
    }

    if (!movie.name) {
      return badRequest(res, 'Informe o nome do filme')
    }
  }
  const movie = req.body as Movie
  return movieModel
    .insertMovie(movie)
    .then(movie => {
      res.json(movie)
    })

    .catch(err => internalServerError(res, err))
}

const updateMovie = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  {
    if (!validateNumber(id)) {
      return badRequest(res, 'Id inválido')
    }
    const movie = req.body
    if (!movie) {
      return badRequest(res, 'Filme inválido')
    }

    if (!movie.name) {
      return badRequest(res, 'Informe o nome do filme')
    }

    const movieSaved = await movieModel.getMovie(id)
    if (!movieSaved) {
      return notFound(res)
    }
  }
  const movie = req.body as Movie
  return movieModel
    .updateMovie(movie)
    .then(movie => {
      res.json(movie)
      console.log(movie)
    })

    .catch(err => internalServerError(res, err))
}

const listMovies = ({}: Request, res: Response) => {
  movieModel
    .listMovies()
    .then(movies => {
      res.json(movies)
    })
    .catch(err => internalServerError(res, err))
}

const getMovie = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  {
    if (!validateNumber(id)) {
      return badRequest(res, 'Id inválido')
    }
  }

  movieModel
    .getMovie(id)
    .then(movies => {
      if (movies) {
        return res.json(movies)
      } else {
        return notFound(res)
      }
    })
    .catch(err => internalServerError(res, err))
}

const getMoviesStars = ({}: Request, res: Response) => {
  movieModel
    .getMoviesStars()
    .then(movies => {
      res.json(movies)
    })
    .catch(err => internalServerError(res, err))
}

const deleteMovie = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  {
    if (validateNumber(id)) {
      return badRequest(res, 'ID inválido')
    }
    const movieSaved = await movieModel.getMovie(id)
    if (!movieSaved) {
      return notFound(res)
    }
  }
  movieModel
    .deleteMovie(id)
    .then(() => {
      ok(res)
    })
    .catch(err => internalServerError(res, err))
}

export const movieController = {
  insertMovie,
  listMovies,
  getMovie,
  getMoviesStars,
  deleteMovie,
  updateMovie
}
