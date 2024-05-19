import React, { useContext, useEffect, useState } from 'react';
import '../styles/Profile.css';
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { UserType } from '../utils/types';
import { getOneUser } from '../http/userAPI';

const Profile = observer( () => {
    const {user} = useContext(Context);
    const [profile, setProfile] = useState<UserType>({ id: 0, name: '', surname: '', registration: new Date(), login: '', password: '', role: ''});
    useEffect(() => {
        const profileId = parseInt(user._user.id);
        getOneUser(profileId).then(data => setProfile(data));
    }, []); 
    return (
        <div className='user-page'>
            <div className='div-desc-user'>
                <h2 className='h2-name'>Мой профиль</h2>
                <h3 className='h3-name'><span>Имя</span><br/>{profile.name}</h3>
                <h3 className='h3-surname'><span>Фамилия</span><br/>{profile.surname}</h3>
                <h3 className='h3-registration'><span>Дата регистрации</span><br/>{`${formatDate(profile.registration)}`}</h3>
            </div>
        </div>
    );
});

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

export default Profile;