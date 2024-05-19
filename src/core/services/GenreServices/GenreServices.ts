import { GenreRepository } from "../../repositories/GenreRepository/IGenreRepository";
import { genreRepositorySQL } from "../../repositories/GenreRepository/GenreRepository";
import { AddGenreDto, UpdateGenreDto } from "../../repositories/GenreRepository/GenreDto";
import logger from '../../logger';

class GenreService {
    constructor (readonly genreRepository: GenreRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting genre by id: ${id}`, 'GenreService');
            return await this.genreRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting genre by id: ${error}`, 'GenreService');
            return null;
        }
    }

    async getByName(name: string) {
        try {
            logger.info(`Getting genre by name: ${name}`, 'GenreService');
            return await this.genreRepository.getByName(name);
        } catch (error) {
            logger.error(`Error getting genre by name: ${error}`, 'GenreService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all genres`, 'GenreService');
            return await this.genreRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all genres: ${error}`, 'GenreService');
            return null;
        }
    }

    async add(dto: AddGenreDto) {
        try {
            logger.info(`Adding genre`, 'GenreService');
            return await this.genreRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding genre: ${error}`, 'GenreService');
            return null;
        }
    }

    async update(dto: UpdateGenreDto, id: number) {
        try {
            logger.info(`Updating genre: ${id}`, 'GenreService');
            return await this.genreRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating genre: ${error}`, 'GenreService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting genre: ${id}`, 'GenreService');
            await this.genreRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting genre: ${error}`, 'GenreService');
            return null;
        }
    }
};

const genreService = new GenreService(genreRepositorySQL);
export { genreService, GenreService };