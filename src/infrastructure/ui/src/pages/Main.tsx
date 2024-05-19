import React , {useContext, useEffect} from 'react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/Main.css';
import 'swiper/css/navigation';
import Image from 'react-bootstrap/Image';
import { observer } from 'mobx-react-lite';
import {Context} from "../index";
import { NavLink } from 'react-router-dom';
import { getMovies } from '../http/movieAPI';

const Main = observer(() => {
    const {main} = useContext(Context);
    useEffect(() => {
        getMovies().then(data => {main.setMovies(data)})
    }, []);
    return (
        <div className='main-div'>
            <div className='upcoming'>
                <h2 className='div-h2'><span className='div-span'>Свежие</span> трейлеры</h2>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        220: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        400: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        700: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1000: {
                            slidesPerView: 4
                        },
                        1300: {
                            slidesPerView: 5
                        }
                    }}
                >
                    {main._movies.upcoming.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <NavLink className='swiper-slider-navLink' to={`/movie/${movie.id}`}>
                            <Image src={movie.photo} rounded className='grow'/>
                        </NavLink>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='lastMonth'>
                <h2 className='div-h2'>Уже <span className='div-span'>в кино</span></h2>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        220: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        400: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        700: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1000: {
                            slidesPerView: 4
                        },
                        1300: {
                            slidesPerView: 5
                        }
                    }}
                >
                    <div>
                    {main._movies.lastMonth.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <NavLink className='swiper-slider-navLink' to={`/movie/${movie.id}`}>
                            <Image src={movie.photo} rounded className='grow'/>
                        </NavLink>
                    </SwiperSlide>
                    ))}
                    </div>
                </Swiper>
            </div>
            <div className='lastYear'>
                <h2 className='div-h2'>Вышли <span className='div-span'>в этом году</span></h2>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        220: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        400: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        700: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1000: {
                            slidesPerView: 4
                        },
                        1300: {
                            slidesPerView: 5
                        }
                    }}
                >
                    <div>
                    {main._movies.lastYear.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <NavLink className='swiper-slider-navLink' to={`/movie/${movie.id}`}>
                            <Image src={movie.photo} rounded className='grow'/>
                        </NavLink>
                    </SwiperSlide>
                    ))}
                    </div>
                </Swiper>
            </div>
        </div>
    );
});

export default Main;