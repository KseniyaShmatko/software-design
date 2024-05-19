import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import '../styles/Reward.css';
import { MovieType, ParticipantType, RewardType } from '../utils/types';
import { getMoviesByReward, getOneReward, getParticipantsByReward } from '../http/rewardAPI';
import { getOneParticipant } from '../http/participantAPI';
import { getOneMovie } from '../http/movieAPI';
import { useParams } from 'react-router-dom';

const useRewardParticipant = (id:string|undefined) => {
    const [participants, setParticipant] = useState<ParticipantType[]>([]);

    useEffect(() => {
        if (id) {
            const participantId = parseInt(id);
            getParticipantsByReward(participantId).then(data => {
                const promises = data.map((participantPart: any) => {
                    return getOneParticipant(participantPart.participant_id).then(member => {
                        return {...member} as ParticipantType;
                    });
                });

                Promise.all(promises).then(result => {
                    setParticipant(result);
                }).catch(error => {
                    console.error('Error fetching participant:', error);
                });
            }).catch(error => {
                console.error('Error fetching rewards participant:', error);
            });
        }
    }, [id]);

    return { participants };
};

const useRewardMovie = (id:string|undefined) => {
    const [movies, setMovie] = useState<MovieType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getMoviesByReward(movieId).then(data => {
                const promises = data.map((moviePart: any) => {
                    return getOneMovie(moviePart.movie_id).then(member => {
                        return {...member} as MovieType;
                    });
                });

                Promise.all(promises).then(result => {
                    setMovie(result);
                }).catch(error => {
                    console.error('Error fetching movie:', error);
                });
            }).catch(error => {
                console.error('Error fetching rewards movie:', error);
            });
        }
    }, [id]);

    return { movies };
};


const Reward = () => {
    const { id } = useParams();
    const [reward, setReward] = useState<RewardType>({ id: 0, name: '', description: '', photo: ''});
    const {movies} = useRewardMovie(id);
    const {participants} = useRewardParticipant(id);
    useEffect(() => {
        if (id) {
            const participantId = parseInt(id);
            getOneReward(participantId).then(data => setReward(data));
        }
    }, [id]); 
    const participantLinks = participants.map((participant, index) => (
        <span key={index}>
            <a href={`/participant/${participant.id}`} className='h3-links'>
            {participant.name + ' ' + participant.surname}
            </a>
            {index < participants.length - 1 && ', '}
        </span>
    ));

    const movieLinks = movies.map((movie, index) => (
        <span key={index}>
            <a href={`/movie/${movie.id}`} className='h3-links'>
            {movie.name}
            </a>
            {index < movies.length - 1 && ', '}
        </span>
    ));
    return (
        <div className='reward-page'>
            <div className='div-image'>
                <Image src={reward.photo} rounded className='img-reward'/>
            </div>
            <div className='div-desc-reward'>
                <h2 className='h2-name'>{reward.name}</h2>
                <h3 className='h3-desc'><span>Описание</span><br/>{reward.description}</h3>
                <h3 className='h3-rewards'><span>Фильмы лауреаты</span><br/>{movies.length ? movieLinks : '-'}</h3>
                <h3 className='h3-rewards'><span>Люди лауреаты</span><br/>{participants.length ? participantLinks : '-'}</h3>
            </div>
        </div>
    );
};

export default Reward;