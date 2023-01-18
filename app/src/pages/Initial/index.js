import ReactLoading from "react-loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PageArea } from "./style";

import logo from "../../assets/logo.svg";

const InitiaPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/login")
        }, 3000);
    }, []);

    return(
        <PageArea>
            <div className="logo">
                <img src={logo} alt="logo iFuture"/>
            </div>
            <ReactLoading type="bubbles" color="#fff" />
        </PageArea>
    );
};

export default InitiaPage;