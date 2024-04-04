import { Genre } from "../../models/Genre/Genre";
import { AddGenreDto, UpdateGenreDto } from "./GenreDto";
import { Repository } from "../IRepository";

export interface GenreRepository extends Repository<Genre, AddGenreDto> {
    getByName(name: string): Promise<Genre | null>;
    update(dto: UpdateGenreDto, id: number): Promise<Genre>;
}