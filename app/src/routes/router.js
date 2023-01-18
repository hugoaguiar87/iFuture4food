import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import InitiaPage from "../pages/Initial";
import LoginPage from "../pages/Login";
import FeedPage from "../pages/Feed";
import SignUpPage from "../pages/SignUp";
import AddressRegisterPage from "../pages/AddressRegister";

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
                <Route path="/feed" element={ <FeedPage /> }/>
                <Route path="/cadastrar" element={ <SignUpPage /> }/>
                <Route path="/cadastrar-endereco" element={ <PrivateRoute> <AddressRegisterPage /> </PrivateRoute> }/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;