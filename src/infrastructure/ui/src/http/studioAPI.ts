import { $host } from "./index";

export const getOneStudio = async (id:number) => {
    const {data} = await $host.get('studio/' + id);
    return data;
}; 

export const getMoviesByStudio = async (id:number) => {
    const {data} = await $host.get('moviestudio/studio/' + id);
    return data;
}; 