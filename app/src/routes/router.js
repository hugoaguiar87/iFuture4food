import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitiaPage from "../pages/Initial";
import LoginPage from "../pages/Login";
import FeedPage from "../pages/Feed";
import SignUpPage from "../pages/SignUp";
import AddressRegisterPage from "../pages/AddressRegister";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <InitiaPage /> }/>
                <Route path="/login" element={ <LoginPage /> }/>
                <Route path="/feed" element={ <FeedPage /> }/>
                <Route path="/cadastrar" element={ <SignUpPage /> }/>
                <Route path="/cadastrar-endereco" element={ <AddressRegisterPage /> }/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;