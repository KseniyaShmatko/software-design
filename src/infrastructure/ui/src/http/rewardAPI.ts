import { $host } from "./index";

export const getOneReward = async (id:number) => {
    const {data} = await $host.get('reward/' + id);
    return data;
}; 

export const getParticipantsByReward = async (id:number) => {
    const {data} = await $host.get('participantreward/reward/' + id);
    return data;
};

export const getMoviesByReward = async (id:number) => {
    const {data} = await $host.get('moviereward/reward/' + id);
    return data;
};