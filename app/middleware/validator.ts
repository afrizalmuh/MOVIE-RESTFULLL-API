import { body, check, param } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { response_exception, response_badrequest } from '../configs/response';

const validator_message = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      if(error.array()[0].msg === 'p_id') return response_badrequest({res:res, code:435, message:'Field [id] must integer'})
      var msg = `Field [${error.array()[0].param}] is mandatory!`
      return response_badrequest({res: res, code: 400, message: msg});
    }
    next();
  } catch (err) {
    return response_exception({res:res, code:479, message:(err as Error).message})
  }
}

const movie_validator = [
  check(['id','title', 'rating', 'created_at', 'updated_at']).notEmpty(),
  check(['id']).isInt().toInt().withMessage('p_id'),
  check(['rating']).isFloat().toFloat()
]

export { movie_validator, validator_message }