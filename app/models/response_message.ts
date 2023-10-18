import { Response } from 'express'

export interface ResponseMessageNormal {
  res: Response,
  code: number,
  message?: string,
  data?: object
}

export interface ResponseMessageNull {
  res: Response,
  code: number,
  message?: string,
  data: any
}

export interface ResponseMessageException {
  res: Response,
  code: number,
  message?: any
}

export interface ResponseMessageBadRequest {
  res: Response,
  code: number,
  message?: any
}