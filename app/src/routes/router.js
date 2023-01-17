import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitiaPage from "../pages/Initial";
import LoginPage from "../pages/Login";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <InitiaPage /> }/>
                <Route path="/login" element={ <LoginPage /> }/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;