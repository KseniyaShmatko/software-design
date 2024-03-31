import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { movieService } from '../../core/services/MovieServices/MovieServices';
import { MovieDto, AddMovieDto, UpdateMovieDto } from '../../core/repositories/MovieRepository/MovieDto';

class MovieController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        res.json('movie controller');
    }

    async getOne(req: Request, res: Response, next: NextFunction) {

    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, description, country, release, photo, trailer} = req.body;
            const dto = new MovieDto(name, description, country, release, photo, trailer);
            const dtoAdd = new AddMovieDto(dto);
            const movie = await movieService.add(dtoAdd);
            return res.json(movie);
        }
        catch(e) {
            return next(ApiError.badRequest('Incorrect parameters'))
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {

    } 

    async delete(req: Request, res: Response, next: NextFunction) {

    }
    
}


export default new MovieController();
