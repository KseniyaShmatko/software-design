import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from '../routes';
import { MAIN_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            {user._isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} Component={Component}/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} Component={Component}/>
            )}
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;