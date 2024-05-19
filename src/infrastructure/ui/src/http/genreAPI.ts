import { $host } from "./index";

export const getOneGenre = async (id:number) => {
    const {data} = await $host.get('genre/' + id);
    return data;
}; 

export const getMoviesByGenre = async (id:number) => {
    const {data} = await $host.get('moviegenre/genre/' + id);
    return data;
}; 