import { makeAutoObservable } from "mobx";
import { MovieType, ParticipantType } from "../utils/types";

type MainResponse = {
    upcoming: MovieType[];
    lastMonth: MovieType[];
    lastYear: MovieType[];
    other: MovieType[];
}

export default class MainStore {
    _movies: MainResponse = {
        upcoming: [],
        lastMonth: [],
        lastYear: [],
        other: []
    }
    _participants: ParticipantType[] = [
        {
            id: 1,
            name: "Benedict",
            surname: "Cumberbatch",
            birth: new Date("1976-07-19T00:00:00.000Z"),
            death: null,
            photo: "./img/photoAct1.png"
        },
        {
            id: 2,
            name: "Tom",
            surname: "Hanks",
            birth: new Date("1956-07-09T00:00:00.000Z"),
            death: null,
            photo: "./img/photoAct2.png"
        }
    ];

    constructor() {
        makeAutoObservable(this);
    }

    setMovies(movies: MainResponse) {
        this._movies = movies;
    }
    setParticipants(participants: ParticipantType[]) {
        this._participants = participants;
    }

    get movies() {
        return this._movies;
    }
    get participants() {
        return this._participants;
    }
}
