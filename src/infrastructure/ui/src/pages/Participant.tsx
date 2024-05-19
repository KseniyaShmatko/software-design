import React, {useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import '../styles/Participant.css';
import { ParticipantType, RewardType, MovieType } from '../utils/types';
import { useParams } from 'react-router-dom';
import { getOneParticipant, getRewardsByParticipant, getMoviesByParticipant } from '../http/participantAPI';
import { getOneReward } from '../http/rewardAPI';
import { getOneMovie } from '../http/movieAPI';

const useParticipantReward = (id:string|undefined) => {
    const [rewards, setRewards] = useState<RewardType[]>([]);

    useEffect(() => {
        if (id) {
            const participantId = parseInt(id);
            getRewardsByParticipant(participantId).then(data => {
                const promises = data.map((participantPart: any) => {
                    return getOneReward(participantPart.reward_id).then(member => {
                        return {...member} as RewardType;
                    });
                });

                Promise.all(promises).then(result => {
                    setRewards(result);
                }).catch(error => {
                    console.error('Error fetching rewards:', error);
                });
            }).catch(error => {
                console.error('Error fetching participant rewards:', error);
            });
        }
    }, [id]);

    return { rewards };
};


const useParticipantMovie = (id:string|undefined) => {
    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        if (id) {
            const participantId = parseInt(id);
            getMoviesByParticipant(participantId).then(data => {
                const promises = data.map((participantPart: any) => {
                    return getOneMovie(participantPart.movie_id).then(member => {
                        return {...member} as MovieType;
                    });
                });

                Promise.all(promises).then(result => {
                    setMovies(result);
                }).catch(error => {
                    console.error('Error fetching movies:', error);
                });
            }).catch(error => {
                console.error('Error fetching participant movies:', error);
                console.log()
            });
        }
    }, [id]);

    return { movies };
};


const Participant = () => {
    const { id } = useParams();
    const [participant, setParticipant] = useState<ParticipantType>({ id: 0, name: '', surname: '', birth: new Date(), death: new Date(), photo: ''});
    const {movies} = useParticipantMovie(id);
    const {rewards} = useParticipantReward(id);
    useEffect(() => {
        if (id) {
            const participantId = parseInt(id);
            getOneParticipant(participantId).then(data => setParticipant(data));
        }
    }, [id]); 
    const rewardLinks = rewards.map((reward, index) => (
        <span key={index}>
            <a href={`/reward/${reward.id}`} className='h3-links'>
            {reward.name}
            </a>
            {index < rewards.length - 1 && ', '}
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
        <div className='participant-page'>
            <div className='div-image'>
                <Image src={participant.photo} rounded className='img-participant'/>
            </div>
            <div className='div-desc-participant'>
                <h2 className='h2-name'>{participant.name + ' ' + participant.surname}</h2>
                <h3 className='h3-birth'><span>Дата рождения</span><br/>{`${formatDate(participant.birth)}`}</h3>
                <h3 className='h3-death'><span>Дата смерти</span><br/>{participant.death === null ? '-' : `${formatDate(participant.death)}`}</h3>
                <h3 className='h3-rewards'><span>Награды</span><br/>{rewards.length ? rewardLinks: '-'}</h3>
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

export default Participant;