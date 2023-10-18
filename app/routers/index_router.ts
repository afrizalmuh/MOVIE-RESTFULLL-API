import express, { Router } from 'express';
const router = Router();
import {
  create_movie_controller,
  delete_movie_controller,
  get_all_movie_controller,
  get_movie_controller,
  update_movie_controller
} from '../controllers/movie_controller';
import { movie_validator, validator_message } from '../middleware/validator';

router.post('/Movies', movie_validator, validator_message, create_movie_controller);
router.get('/Movies', get_all_movie_controller);
router.get('/Movies/:ID', get_movie_controller);
router.patch('/Movies/:ID', movie_validator, validator_message, update_movie_controller)
router.delete('/Movies/:ID', delete_movie_controller)

export { router }