import { ComponentType } from "react";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import { GENRE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MOVIE_ROUTE, PARTICIPANT_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, REWARD_ROUTE, STUDIO_ROUTE } from "./utils/consts";
import Participant from "./pages/Participant";
import Studio from "./pages/Studio";
import Reward from "./pages/Reward";
import Genre from "./pages/Genre";

interface Route {
    path: string;
    Component: ComponentType<any>;
}

export const authRoutes: Route[] = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
];

export const publicRoutes: Route[] = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MOVIE_ROUTE + '/:id',
        Component: Movie
    },
    {
        path: PARTICIPANT_ROUTE + '/:id',
        Component: Participant
    },
    {
        path: STUDIO_ROUTE + '/:id',
        Component: Studio
    },
    {
        path: REWARD_ROUTE + '/:id',
        Component: Reward
    },
    {
        path: GENRE_ROUTE + '/:id',
        Component: Genre
    }
];
