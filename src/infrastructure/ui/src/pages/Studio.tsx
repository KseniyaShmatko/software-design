import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import '../styles/Studio.css';
import { MovieType, StudioType } from '../utils/types';
import { getMoviesByStudio, getOneStudio } from '../http/studioAPI';
import { getOneMovie } from '../http/movieAPI';
import { useParams } from 'react-router-dom';

const useStudioMovie = (id:string|undefined) => {
    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getMoviesByStudio(movieId).then(data => {
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
                console.error('Error fetching movie movies:', error);
            });
        }
    }, [id]);

    return { movies };
};

const Studio = () => {
    const { id } = useParams();
    const [studio, setStudio] = useState<StudioType>({ id: 0, name: '', founder: '', country: '', foundation: new Date(), photo: ''});
    const {movies} = useStudioMovie(id);
    useEffect(() => {
        if (id) {
            const participantId = parseInt(id);
            getOneStudio(participantId).then(data => setStudio(data));
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
        <div className='studio-page'>
            <div className='div-image'>
                <Image src={studio.photo} rounded className='img-studio'/>
            </div>
            <div className='div-desc-studio'>
                <h2 className='h2-name'>{studio.name}</h2>
                <h3 className='h3-founder'><span>Основатель</span><br/>{studio.founder}</h3>
                <h3 className='h3-country'><span>Страна</span><br/>{studio.country}</h3>
                <h3 className='h3-foundation'><span>Дата создания</span><br/>{`${formatDate(studio.foundation)}`}</h3>
                <h3 className='h3-movies'><span>Фильмы</span><br/>{movies.length ? movieLinks : '-'}</h3>
            </div>
        </div>
    );
};

const formatDate = (releaseDate: Date) => {
    const date = new Date(releaseDate);
    const day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    if (month === 'август' || month === 'март') {
        month = month + 'a';
    }
    else {
        month = month.slice(0, month.length - 1) + 'я';
    }
    return `${day} ${month} ${year}`;
};

export default Studio;