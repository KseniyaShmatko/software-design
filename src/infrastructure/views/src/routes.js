import { MAIN_ROUTE, MOVIE_ROUTE } from "./consts";
import MainPage from "./pages/MainPage";
import MoviePage from "./pages/MoviePage";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: MOVIE_ROUTE + '/:id',
        Component: MoviePage
    }
]