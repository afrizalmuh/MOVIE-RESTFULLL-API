import { db } from '../configs/database'
import { TypedReturnedService } from '../models/response_service'
import {
  requestMovie, getMovie, requestUpdateMovie
} from '../models/movie_service_models'

export const create_movie = async (param: requestMovie) => {
  try {
    let result = await db('public.movies').insert(param).returning('*')
    return { status: 0, data: result }
  } catch (err) {
    return {status: 492, message:(err as Error).message} as TypedReturnedService
  }
}

export const get_all_movies = async () => {
  try {
    let result = await db('public.movies').select('*');
    return {status:0, data:result}
  } catch (err) {
    return {status: 483, message:(err as Error).message} as TypedReturnedService
  }
}

export const get_movies = async (param: getMovie) => {
  try {
    let { ID } = param
    let result = await db('public.movies').select('*').where('id', ID);
    return {status:0, data: result}
  } catch (err) {
    return {status: 429, message:(err as Error).message} as TypedReturnedService
  }
}

export const update_movies = async (param: requestUpdateMovie) => {
  try {
    let { id_params, id, title, description, rating, image, created_at, updated_at } = param
    let result = await db('public.movies')
      .where('id', id_params)
      .update({
        id: id,
        title: title,
        description: description,
        rating: rating,
        image: image,
        created_at: created_at,
        updated_at:updated_at
      }).returning('*')
    return {status:0, data: result}
  } catch (err) {
    return {status:428, message:(err as Error).message} as TypedReturnedService
  }
}

export const delete_movies = async (param: getMovie) => {
  try {
    let { ID } = param
    let result = await db('public.movies').where('id', ID).del()
    return {status:0, data:result}
  } catch (err) {
    return {status: 427, message:(err as Error).message} as TypedReturnedService
  }
}