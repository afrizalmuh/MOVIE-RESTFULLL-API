import { Request, Response } from "express";
import { create_movie, delete_movies, get_all_movies, get_movies, update_movies } from "../services/movie_service";
import moment from "moment";
import { requestMovie, requestUpdateMovie } from "../models/movie_service_models";
import { responseMovie } from "../models/movie_controller_models"
import { response_badrequest, response_exception, response_normal, response_null, response_insert } from "../configs/response";
import { TypedReturnedService } from "../models/response_service";

const create_movie_controller = async (req: Request, res: Response) => {
  let { id, title, description, rating, image, created_at, updated_at } = req.body
  try {

    let search_movie = await get_movies({ ID: id })
    if (search_movie.data.length !== 0) return response_badrequest({ res: res, code: 403, message: `All ready exist movie with Id=${id}` })

    let request_movies: requestMovie = {
      id: id,
      title: title,
      description: description,
      rating: rating,
      image: image,
      created_at: created_at,
      updated_at: updated_at
    }

    let create_movies = await create_movie(request_movies);
    if (create_movies.status != 0) throw create_movies;

    let result = create_movies.data[0];
    let response_create_movie: responseMovie = {
      id: Number(result.id),
      title: result.title,
      description: result.description,
      rating: result.rating,
      image: result.image,
      created_at: moment(result.created_at).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment(result.updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    return response_insert({ res: res, code: 0, message: 'Success create movies', data: response_create_movie })
  } catch (err) {
    var error = (err as TypedReturnedService)
    return response_exception({ res: res, code: error.status, message: error.message })
  }
}

const get_all_movie_controller = async (req: Request, res: Response) => {
  try {
    let datas_movie = await get_all_movies();

    if (datas_movie.status != 0) throw datas_movie
    if (datas_movie.data.length == 0) throw { status: 404, message:'Data not found'}

    datas_movie.data.forEach((item: any) => {
      item.id = Number(item.id)
      item.created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')
      item.updated_at = moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss')
    });

    return response_normal({ res: res, code: 0, message: 'Success get all data movies', data: datas_movie.data })
  } catch (err) {
    var error = (err as TypedReturnedService)
    if(error.status !=0) return response_null({res:res, code:error.status, message:error.message})
    return response_exception({res:res, code:error.status, message:error.message})
  }
}

const get_movie_controller = async (req: Request, res: Response) => {
  try {
    let { ID } = req.params
    let data_movie = await get_movies({ ID: Number(ID) })
    if (data_movie.status != 0) throw data_movie
    if(data_movie.data.length <= 0) throw {status: 404, message:`Data movie with id=${ID} not found`}

    let result = data_movie.data[0]
    let response_movie: responseMovie = {
      id: Number(result.id),
      title: result.title,
      description: result.description,
      rating: result.rating,
      image: result.image,
      created_at: moment(result.created_at).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment(result.updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    return response_normal({ res: res, code: 0, message: 'Success get all data movies', data: response_movie })
  } catch (err) {
    var error = (err as TypedReturnedService)
    if (error.status <= 410) return response_badrequest({res:res, code:error.status, message:error.message})
    return response_exception({res:res, code:error.status, message:error.message})
  }
}

const update_movie_controller = async (req: Request, res: Response) => {
  try {
    let {ID} = req.params
    let { id, title, description, rating, image, created_at, updated_at } = req.body

    let request_update: requestUpdateMovie = {
      id_params: ID,
      id: id,
      title: title,
      description: description,
      rating: rating,
      image: image,
      created_at: created_at,
      updated_at: updated_at
    }
    let update_movie = await update_movies(request_update);

    if (update_movie.status != 0) throw update_movie;
    if (update_movie.data.length === 0) return response_badrequest({ res: res, code: 404, message: `Data movie not found with Id=${ID}` });

    let result = update_movie.data[0]
    let response_movie: responseMovie = {
      id: Number(result.id),
      title: result.title,
      description: result.description,
      rating: result.rating,
      image: result.image,
      created_at: moment(result.created_at).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment(result.updated_at).format('YYYY-MM-DD HH:mm:ss')
    }

    return response_normal({ res: res, code: 0, message: 'Success update data movies', data: response_movie })
  } catch (err) {
    var error = (err as TypedReturnedService)
    return response_exception({ res: res, code:error.status, message:error.message})
  }
}

const delete_movie_controller = async (req: Request, res: Response) => {
  try {
    let { ID } = req.params
    let delete_movie = await delete_movies({ ID: Number(ID) })
    if (delete_movie.status != 0) throw delete_movie
    if (delete_movie.data === 0) return response_badrequest({ res: res, code: 404, message: `Data movie not found with Id=${ID}` });

    return response_normal({ res: res, code: 0, message: 'Success delete data movies'})
  } catch (err) {
    var error = (err as TypedReturnedService)
    return response_exception({ res: res, code:error.status, message:error.message})
  }
}

export {
  create_movie_controller,
  get_all_movie_controller,
  get_movie_controller,
  update_movie_controller,
  delete_movie_controller
}