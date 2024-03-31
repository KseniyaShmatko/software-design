import { Genre } from "../../models/Genre/Genre";
import { AddGenreDto, UpdateGenreDto } from "./GenreDto";
import { Repository } from "../IRepository";

export interface GenreRepository extends Repository<Genre, AddGenreDto> {
    getByName(name: string): Genre | null;
    update(dto: UpdateGenreDto): Genre;
}