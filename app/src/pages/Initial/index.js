import ReactLoading from "react-loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import logo from "../../assets/logo.svg";

const InitiaPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/login")
        }, 3000);
    }, []);

    return(
        <div className="pageArea">
            <div className="logo">
                <img src={logo} alt="logo iFuture"/>
            </div>
            <ReactLoading type="bubbles" color="#fff" />
        </div>
    );
};

export default InitiaPage;