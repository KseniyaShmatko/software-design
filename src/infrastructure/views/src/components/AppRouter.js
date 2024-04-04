import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../consts";
import { Context } from "..";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Navigate to={MAIN_ROUTE} replace={true}/>
        </Routes>
    );
};

export default AppRouter;
