import { $host } from "./index";

export const getOneParticipant = async (id:number) => {
    const {data} = await $host.get('participant/' + id);
    return data;
}; 

export const getRewardsByParticipant = async (id:number) => {
    const {data} = await $host.get('participantreward/participant/' + id);
    return data;
}; 

export const getMoviesByParticipant = async (id:number) => {
    const {data} = await $host.get('movieparticipant/participant/' + id);
    return data;
}; 
