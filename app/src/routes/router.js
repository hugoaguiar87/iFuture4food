import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import InitiaPage from "../pages/Initial";
import LoginPage from "../pages/Login";
import FeedPage from "../pages/Feed";
import SignUpPage from "../pages/SignUp";
import AddressRegisterPage from "../pages/AddressRegister";
import SearchPage from "../pages/Search";
import RestaurantPage from "../pages/Restaurant";

import { isLogged } from "../helpers/AuthHandler";

const Router = () => {
    const PrivateRoute = ({children}) => {
        let logged = isLogged();

        return (
            logged ? children : <Navigate to="/"/>
        );
    };

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <InitiaPage /> }/>
                <Route path="/login" element={ <LoginPage /> }/>
                <Route path="/feed" element={ <PrivateRoute> <FeedPage /> </PrivateRoute> }/>
                <Route path="/cadastrar" element={ <SignUpPage /> }/>
                <Route path="/cadastrar-endereco" element={ <PrivateRoute> <AddressRegisterPage /> </PrivateRoute> }/>
                <Route path="/search" element={ <PrivateRoute> <SearchPage/> </PrivateRoute> }/>
                <Route path="/restaurant/:id" element={ <PrivateRoute> <RestaurantPage/> </PrivateRoute> }/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;