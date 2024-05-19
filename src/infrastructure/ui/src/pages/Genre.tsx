import React, { useEffect, useState } from 'react';
import '../styles/Genre.css';
import { GenreType, MovieType } from '../utils/types';
import { getOneMovie } from '../http/movieAPI';
import { getMoviesByGenre, getOneGenre } from '../http/genreAPI';
import { useParams } from 'react-router-dom';

const useGenreMovie = (id:string|undefined) => {
    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getMoviesByGenre(movieId).then(data => {
                const promises = data.map((moviePart: any) => {
                    return getOneMovie(moviePart.movie_id).then(member => {
                        return {...member} as MovieType;
                    });
                });

                Promise.all(promises).then(result => {
                    setMovies(result);
                }).catch(error => {
                    console.error('Error fetching movies:', error);
                });
            }).catch(error => {
                console.error('Error fetching genre movies:', error);
            });
        }
    }, [id]);

    return { movies };
};

const Genre = () => {
    const { id } = useParams();
    const [genre, setGenre] = useState<GenreType>({ id: 0, name: '', description: ''});
    const {movies} = useGenreMovie(id);
    useEffect(() => {
        if (id) {
            const genreId = parseInt(id);
            getOneGenre(genreId).then(data => setGenre(data));
        }
    }, [id]); 
    const movieLinks = movies.map((movie, index) => (
        <span key={index}>
            <a href={`/movie/${movie.id}`} className='h3-links'>
            {movie.name}
            </a>
            {index < movies.length - 1 && ', '}
        </span>
    ));
    return (
        <div className='genre-page'>
            <div className='div-desc-genre'>
                <h2 className='h2-name'>{genre.name}</h2>
                <h3 className='h3-desc'><span>Описание</span><br/>{genre.description}</h3>
                <h3 className='h3-movie'><span>Фильмы</span><br/>{movies.length ? movieLinks : '-'}</h3>
            </div>
        </div>
    );
};

export default Genre;