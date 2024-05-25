import React, { useContext, useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import '../styles/Movie.css';
import Button from 'react-bootstrap/Button';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/Main.css';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { getOneMovie, getParticipantsByMovie, getGenresByMovie, getStudiosByMovie, getRewardsByMovie, getCommentsByMovie, getMarksMovie, postComment } from '../http/movieAPI';
import { getOneParticipant } from '../http/participantAPI';
import { MovieType, ParticipantType, GenreType, StudioType, RewardType, CommentType, RatingType } from "../utils/types";
import { getOneGenre } from '../http/genreAPI';
import { getOneStudio } from '../http/studioAPI';
import { getOneReward } from '../http/rewardAPI';
import { getMarkByUser, getOneUser, postMarkMovie } from '../http/userAPI';
import { Context } from '../index';

export interface ExtendedParticipantType extends ParticipantType {
    role: string;
}

export interface ExtendedCommentType extends CommentType {
    name: string;
    surname: string;
}


const useMovieParticipants = (id:string|undefined) => {
    const [directors, setDirectors] = useState<ExtendedParticipantType[]>([]);
    const [actors, setActors] = useState<ExtendedParticipantType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getParticipantsByMovie(movieId).then(data => {
                const promises = data.map((moviePart: any) => {
                    return getOneParticipant(moviePart.participant_id).then(member => {
                        return {...member, role: moviePart.role} as ExtendedParticipantType;
                    });
                });

                Promise.all(promises).then(result => {
                    const directors = result.filter(person => person.role === 'director');
                    const actors = result.filter(person => person.role === 'actor');
                    setDirectors(directors);
                    setActors(actors);
                }).catch(error => {
                    console.error('Error fetching participants:', error);
                });
            }).catch(error => {
                console.error('Error fetching movie participants:', error);
            });
        }
    }, [id]);

    return { directors, actors };
};

const useMovieGenre = (id:string|undefined) => {
    const [genres, setGenres] = useState<GenreType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getGenresByMovie(movieId).then(data => {
                const promises = data.map((moviePart: any) => {
                    return getOneGenre(moviePart.genre_id).then(member => {
                        return {...member} as GenreType;
                    });
                });

                Promise.all(promises).then(result => {
                    setGenres(result);
                }).catch(error => {
                    console.error('Error fetching genres:', error);
                });
            }).catch(error => {
                console.error('Error fetching movie genres:', error);
            });
        }
    }, [id]);

    return { genres };
};

const useMovieStudio = (id:string|undefined) => {
    const [studios, setStudios] = useState<StudioType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getStudiosByMovie(movieId).then(data => {
                const promises = data.map((moviePart: any) => {
                    return getOneStudio(moviePart.studio_id).then(member => {
                        return {...member} as StudioType;
                    });
                });

                Promise.all(promises).then(result => {
                    setStudios(result);
                }).catch(error => {
                    console.error('Error fetching studios:', error);
                });
            }).catch(error => {
                console.error('Error fetching movie studios:', error);
            });
        }
    }, [id]);

    return { studios };
};

const useMovieReward = (id:string|undefined) => {
    const [rewards, setRewards] = useState<RewardType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getRewardsByMovie(movieId).then(data => {
                const promises = data.map((moviePart: any) => {
                    return getOneReward(moviePart.reward_id).then(member => {
                        return {...member} as RewardType;
                    });
                });

                Promise.all(promises).then(result => {
                    setRewards(result);
                }).catch(error => {
                    console.error('Error fetching rewards:', error);
                });
            }).catch(error => {
                console.error('Error fetching movie rewards:', error);
            });
        }
    }, [id]);

    return { rewards };
};

const useMovieComments = (id:string|undefined) => {
    const [comments, setComments] = useState<ExtendedCommentType[]>([]);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getCommentsByMovie(movieId).then(data => {
                const promises = data.map((moviePart: any) => {
                    return getOneUser(moviePart.user_id).then(member => {
                        return {...moviePart, name: member.name, surname: member.surname} as ExtendedCommentType;
                    });
                });

                Promise.all(promises).then(result => {
                    setComments(result);
                }).catch(error => {
                    console.error('Error fetching comments:', error);
                });
            }).catch(error => {
                console.error('Error fetching movie comments:', error);
            });
        }
    }, [id]);

    return { comments };
};

const Movie = () => {
    const {user} = useContext(Context);
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieType>({ id: 0, name: '', description: '', country: '', release: new Date(), photo: '', trailer: '' });
    const [marks, setMarks] = useState('0');
    const { directors, actors } = useMovieParticipants(id);
    const {genres} = useMovieGenre(id);
    const {studios} = useMovieStudio(id);
    const {rewards} = useMovieReward(id);
    const {comments} = useMovieComments(id);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (id) {
            const movieId = parseInt(id);
            getOneMovie(movieId).then(data => setMovie(data));
            getMarksMovie(movieId).then(data => setMarks(data));
            console.log(user._isAuth, user._user.id);
            if(user._isAuth && user._user.id !== undefined) {
                console.log(user._user.id)
                getMarkByUser(user._user.id).then((data: RatingType[]) => {
                    console.log('Marks data:', data); 
                    const movieId = parseInt(id);
                    const movieMark = data.find((mark: RatingType) => mark.movie_id === movieId);
                    console.log(movieMark)
                    if (movieMark !== undefined) {
                        setRating(movieMark.mark);
                    }
                })
            }
        }
    }, [id, user._user.id]); 

    const directorLinks = directors.map((director, index) => (
        <span key={index}>
          <a href={`/participant/${director.id}`} className='h3-links'>
            {director.name} {director.surname}
          </a>
          {index < directors.length - 1 && ', '}
        </span>
    ));
      
    const actorLinks = actors.map((actor, index) => (
        <span key={index}>
            <a href={`/participant/${actor.id}`} className='h3-links'>
            {actor.name} {actor.surname}
            </a>
            {index < actors.length - 1 && ', '}
        </span>
    ));
    
    const genreLinks = genres.map((genre, index) => (
        <span key={index}>
            <a href={`/genre/${genre.id}`} className='h3-links'>
            {genre.name}
            </a>
            {index < genres.length - 1 && ', '}
        </span>
    ));

    const studioLinks = studios.map((studio, index) => (
        <span key={index}>
            <a href={`/studio/${studio.id}`} className='h3-links'>
            {studio.name}
            </a>
            {index < studios.length - 1 && ', '}
        </span>
    ));
      
    const rewardLinks = rewards.map((reward, index) => (
        <span key={index}>
            <a href={`/reward/${reward.id}`} className='h3-links'>
            {reward.name}
            </a>
            {index < rewards.length - 1 && ', '}
        </span>
    ));

    function clickRate(mark: boolean) {
        if (!user._isAuth) {
            alert("Чтобы оценить трейлер нужно зарегистрироваться");
            return;
        }
        if (id) {
            if(rating === true || rating === false) {
                alert("Вы уже дали оценку");
                return;
            }
            const movieId = parseInt(id);
            postMarkMovie(movieId, user._user.id, mark).then(() => {
                setRating(mark);
            })
        }
    }

    function clickComment() {
        if(!user._isAuth) {
            alert("Чтобы оставить комментарий нужно зарегистрироваться")
        }
        if (id) {
            const movieId = parseInt(id);
            console.log(user._user.id);
            postComment(content, new Date(), movieId, user._user.id);
            setContent(content);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    return (
        <div className='movie-page'>
            <div className='div-image'>
                <Image src={movie.photo} rounded className='img-movie'/>
            </div>
            <div className='div-desc-movie'>
                <h2 className='h2-name'>{movie.name}</h2>
                <h3 className='h3-desc'><span>Описание</span><br/>{movie.description}</h3>
                <h3 className='h3-release'><span>Дата выхода</span><br/>{`${formatDate(movie.release)}`}</h3>
                <h3 className='h3-participants-dir'><span>Режиссер</span><br/>{directors.length ? directorLinks : '-'}</h3>
                <h3 className='h3-participants-act'><span>Актеры</span><br/>{actors.length ? actorLinks : '-'}</h3>
                <h3 className='h3-genres'><span>Жанр</span><br/>{genres.length ? genreLinks : '-'}</h3>
                <h3 className='h3-studios'><span>Студии</span><br/>{studios.length ? studioLinks : '-'}</h3>
                <h3 className='h3-rewards'><span>Награды</span><br/>{rewards.length ? rewardLinks : '-'}</h3>
                <h3 className='h3-country'><span>Страна</span><br/>{movie.country}</h3>
            </div>
            <div className='div-trailer'>
                <iframe
                src={movie.trailer}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className='div-rating'>
                <h3 className='h3-rate'>Рейтинг ожидания <span>{Math.round(+marks) + '%'}</span></h3>
                <Button variant="outline-success" onClick={() => clickRate(true)} className='div-button' style={{ boxShadow: rating === true ? '3px 3px 5px green' : '' }}>Жду</Button>
                <Button variant="outline-danger" onClick={() => clickRate(false)} className='div-button' style={{ boxShadow: rating === false ? '3px 3px 5px red' : '' }}>Не жду</Button>
            </div>  
            <div className='comments'>
                <h3 className='h2-name comment-name'>Комментарии</h3>
                <div className='div-comments-swiper'>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={30}
                        direction={'vertical'}
                        pagination={{
                            clickable: true,
                          }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {comments.map((comment, index) => (
                        <SwiperSlide className='comment-swiperSlide' key={index}>
                            <div className='comment-content'>
                                <h4 className='h4-name'>{comment.name + ' ' + comment.surname}</h4>
                                <h4 className='h4-date'>{`${formatDate(comment.date)}`}</h4>
                                <h3 className='h3-comment'>{comment.content}</h3>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='div-comments-create'>
                    <Form.Group className="mb-3 comment-group" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='comment-label'>Ваш комментарий</Form.Label>
                        <Form.Control className='comment-form'  value={content}
                      onChange={handleInputChange} as="textarea" rows={3} maxLength={255}/>
                    </Form.Group>
                    <Button variant="outline-info"  onClick={() => clickComment()} className='comments-form-button'>Опубликовать</Button>
                </div>
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

export default Movie;