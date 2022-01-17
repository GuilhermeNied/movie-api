import { dbQuery, dbQueryFirst } from '../services/db'

export type Movie = {
  id: number
  name: string
  stars: number
}

const insertMovie = async (movie: Movie) => {
  await dbQuery(`INSERT INTO movie (name, stars) VALUES (?,?)`, [
    movie.name,
    movie.stars
  ])

  let retorno = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE name ='movie' `
  )
  return retorno[0].Id as number | undefined
}

const updateMovie = async (movie: Movie) => {
  await dbQuery(`UPDATE movie SET name = ?, stars = ?  WHERE id = ?`, [
    movie.name,
    movie.stars,
    movie.id
  ])

  return getMovie(movie.id)
}

const listMovies = async () => {
  const retorno = await dbQuery(`SELECT * FROM movie `)
  return retorno as Movie[]
}

const getMovie = async (id: Number) => {
  const retorno = await dbQueryFirst(`SELECT * FROM movie WHERE id = ?`, [id])
  return retorno as Movie | undefined
}
const deleteMovie = async (id: number) => {
  await dbQueryFirst(`DELETE FROM movie WHERE id = ?`, [id])
}

const getMoviesStars = async () => {
  const retorno = await dbQuery(`SELECT * FROM movie WHERE stars = 0 `)
  return retorno as Movie[]
}

export const movieModel = {
  insertMovie,
  listMovies,
  getMovie,
  getMoviesStars,
  deleteMovie,
  updateMovie
}
