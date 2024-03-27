import { GenreRepository } from "../../repositories/GenreRepository/GenreRepository";
import { AddGenreDto, UpdateGenreDto } from "../../repositories/GenreRepository/GenreDto";

export class GenreService {
    constructor (readonly genreRepository: GenreRepository ) {}

    async getById(id: number) {
        try {
            return await this.genreRepository.getById(id);
        } catch (error) {
            console.error(`Error getting genre by id: ${error}`);
            return null;
        }
    }

    async getByName(name: string) {
        try {
            return await this.genreRepository.getByName(name);
        } catch (error) {
            console.error(`Error getting genre by name: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.genreRepository.getAll();
        } catch (error) {
            console.error(`Error getting all genres: ${error}`);
            return null;
        }
    }

    async add(dto: AddGenreDto) {
        try {
            return await this.genreRepository.add(dto);
        } catch (error) {
            console.error(`Error adding genre: ${error}`);
            return null;
        }
    }

    async update(dto: UpdateGenreDto) {
        try {
            return await this.genreRepository.update(dto);
        } catch (error) {
            console.error(`Error updating genre: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.genreRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting genre: ${error}`);
            return null;
        }
    }
};