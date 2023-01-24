import { PageArea } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { requestApi } from "../../helpers/Requests";

import back from "../../assets/back.svg";


const RestaurantPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    
    const [restInfos, setRestInfos] = useState(null);
    const [categories, setCategories] = useState([]);

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setToken(Cookies.get('token'));
    }, []);

    useEffect(() => {
        const getRest = async (tokenId, restId) => {
            const infos = await requestApi.restaurantDetails(tokenId, restId);
            if(infos.error){
                setError(infos);
                setLoading(false);
            } else {
                setRestInfos(infos);
                setLoading(false);
                setError(null);
            };
        };

        if(token !== null){
            getRest(token, id);
        };
    }, [token]);

    useEffect(() => {
        if(restInfos !== null){
            let arrayCategs = [];
            for(let i of restInfos.restaurant.products){
                if(!arrayCategs.includes(i.category)){
                    arrayCategs.push(i.category);
                };
            };

            setCategories(arrayCategs);
        };
    }, [restInfos]);

    console.log(restInfos)
    console.log(categories)

    return(
        <PageArea>
            <div className="title">
                <img src={back} alt="Voltar" onClick={() => navigate("/feed")}/>
                <span>Restaurante</span>
            </div>
        </PageArea>
    );
};

export default RestaurantPage;