export interface MovieType {
    id: number;
    name: string;
    description: string;
    country: string;
    release: Date;
    photo: string;
    trailer: string;
}

export interface ParticipantType {
    id: number;
    name: string;
    surname: string;
    birth: Date;
    death: Date | null;
    photo: string;
}

export interface GenreType {
    id: number;
    name: string;
    description: string;
}

export interface StudioType {
    id: number;
    name: string;
    founder: string;
    country: string;
    foundation: Date;
    photo: string;
}

export interface RewardType {
    id: number;
    name: string;
    description: string;
    photo: string;
}

export interface CommentType {
    id: number;
    content: string;
    date: Date;
    movie_id: number;
    user_id: number;

}

export interface UserType {
    id: number;
    name: string;
    surname: string;
    registration: Date;
    login: string;
    password: string;
    role: string;
}