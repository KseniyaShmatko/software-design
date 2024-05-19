import { $authHost, $host } from "./index";   

export const getMovies = async ( ) => {
    const {data} = await $host.get('movie/');
    return data;
}; 

export const getOneMovie = async (id:number) => {
    const {data} = await $host.get('movie/' + id);
    return data;
}; 

export const getOneMovieByName = async (name:string) => {
    const {data} = await $host.get('movie/name/' + name);
    return data;
}; 

export const getParticipantsByMovie = async (id:number) => {
    const {data} = await $host.get('movieparticipant/movie/' + id);
    return data;
}; 

export const getGenresByMovie = async (id:number) => {
    const {data} = await $host.get('moviegenre/movie/' + id);
    return data;
}; 

export const getStudiosByMovie = async (id:number) => {
    const {data} = await $host.get('moviestudio/movie/' + id);
    return data;
}; 

export const getRewardsByMovie = async (id:number) => {
    const {data} = await $host.get('moviereward/movie/' + id);
    return data;
}; 

export const getCommentsByMovie = async (id:number) => {
    const {data} = await $host.get('comment/movie/' + id);
    return data;
}; 

export const getMarksMovie = async (id:number) => {
    const {data} = await $host.get('/movieuser/marks/' + id);
    return data;
}; 

export const postComment = async (content:string, date:Date, movie_id:number, user_id:number) => {
    const {data} = await $authHost.post('comment/', {content, date, movie_id, user_id});
    return data;
}; 