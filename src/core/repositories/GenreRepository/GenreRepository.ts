import { Genre } from "../../models/Genre/Genre";
import { AddGenreDto, UpdateGenreDto } from "./GenreDto";
import { GenreRepository } from "./IGenreRepository";
import { GenreDB } from "../../../infrastructure/db/entities/entities";
import { Sequelize } from 'sequelize';

class GenreRepositorySQL implements GenreRepository {
    async getById(id: number): Promise<Genre | null> {
        try {
            const genreModel = await GenreDB.findByPk(id);
            if (genreModel) {
                const genreData = genreModel.toJSON();
                return new Genre(genreData.id, genreData.name, genreData.description);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting genre by ID:", error);
            throw new Error("Failed to get genre by ID");
        }
    }

    async getAll(): Promise<Genre[]> {
        try {
            const genresModels = await GenreDB.findAll();
            const genresData = genresModels.map(genreModel => genreModel.toJSON());
            const genres = genresData.map(genreData => new Genre(genreData.id, genreData.name, genreData.description));
            return genres;
        } catch (error) {
            console.error("Error occurred while getting all genres:", error);
            throw new Error("Failed to get all genres");
        }
    }

    async add(dto: AddGenreDto): Promise<Genre> {
        try {
            const { name, description} = dto;
            const genreModel = await GenreDB.create({ name, description});
            const genre = genreModel.toJSON();
            return new Genre(genre.id, genre.name, genre.description);
        } catch (error) {
            console.error("Error occurred while adding genre:", error);
            throw new Error("Failed to add genre");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await GenreDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting genre:", error);
            throw new Error("Failed to delete genre");
        }
    }

    async getByName(name: string): Promise<Genre | null> {
        try {
            const genreModel = await GenreDB.findOne({
                where: Sequelize.literal(`LOWER(name) = LOWER('${name}')`)
            });
            if (genreModel) {
                const genre = genreModel.toJSON();
                return new Genre(genre.id, genre.name, genre.description);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting genre by name:", error);
            throw new Error("Failed to get genre by name");
        }
    }

    async update(dto: UpdateGenreDto, id: number): Promise<Genre> {
        try {
            const searchedGenre = await GenreDB.findByPk(id);
            if (!searchedGenre) {
                throw new Error("Genre not found");
            }
            await GenreDB.update(dto, { where: { id: id } });
            const updatedGenreModel = await GenreDB.findByPk(id);
            const updatedGenre = updatedGenreModel?.toJSON();
            return new Genre(updatedGenre.id, updatedGenre.name, updatedGenre.description);
        } catch (error) {
            console.error("Error occurred while updating genre:", error);
            throw new Error("Failed to update genre");
        }
    }
}

export const genreRepositorySQL = new GenreRepositorySQL();
