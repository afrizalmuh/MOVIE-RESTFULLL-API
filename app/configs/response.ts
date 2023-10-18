import {
  ResponseMessageNormal,
  ResponseMessageBadRequest,
  ResponseMessageException,
  ResponseMessageNull
} from '../models/response_message'

export const response_normal = async (param: ResponseMessageNormal) => {
  let { res, code, message, data } = param;
  return res.status(200).json({
    code: code,
    message: message,
    data: data ?? {}
  }) 
}

export const response_insert = async (param: ResponseMessageNormal) => {
  let { res, code, message, data } = param;
  return res.status(201).json({
    code: code,
    message: message,
    data: data ?? {}
  }) 
}

export const response_null = async (param: ResponseMessageNormal) => {
  let { res, code, message, data } = param;
  return res.status(200).json({
    code: code,
    message: message,
    data: data
  }) 
}

export const response_badrequest = async (param: ResponseMessageBadRequest) => {
  let { res, code, message } = param;
  return res.status(400).json({
    code: code,
    message: 'BAD REQUEST',
    data: {
      error: message
    }
  }) 
}

export const response_exception = async (param: ResponseMessageException) => {
  let { res, code, message } = param
  return res.status(500).json({
    code: code,
    message: 'SISTEM SEDANG MENGALAMI GANGGUAN',
    data: {
      error: message
    }
  })
}