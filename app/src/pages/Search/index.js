import { PageArea } from "./styled";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import { requestApi } from "../../helpers/Requests";

import search from "../../assets/search.svg";
import back from "../../assets/back.svg";

const SearchPage = () => {
    const urlParams = useLocation();
    const useQueryString = () => {
        return new URLSearchParams(urlParams.search);
    };
    const queryParams = useQueryString();
    const navigate = useNavigate();

    const [query, setQuery] = useState( queryParams.get('query') !== null ? queryParams.get('query') : '' );

    const [allRestaurants, setAllRestaurants] = useState(null);
    const [restSearch, setRestSearch] = useState(null);

    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setToken(Cookies.get('token'));
    }, []);

    useEffect(() => {
        const getRestaurants = async() => {
            setLoading(true);
            const rest = await requestApi.restaurants(token);
            if(rest.error){
                setLoading(false);
                setError(rest);
            } else {
                setLoading(false);
                setAllRestaurants(rest);
                setError(null);
            };            
        };

        if(token !== null){
            getRestaurants();
        };
        
    }, [token]);

    useEffect(() => {
        const restFilter = () => {
            const rest = allRestaurants.restaurants.filter((i) => {
                if( i.name.toLowerCase().includes( query.toLowerCase() ) ){
                    return true
                } else {
                    return false
                };
            });

            setRestSearch(rest);
        };

        if(allRestaurants !== null){
            restFilter();
        };
    }, [allRestaurants]);


    console.log(allRestaurants)
    console.log("busca: ", restSearch);

    return(
        <PageArea>
            <div className="title">
                <img src={back} alt="Voltar" onClick={() => navigate("/feed")}/>
                <span>Busca</span>
            </div>

            <div className="body">
                <form method="GET" action="/search" className="search">
                    <img 
                        src={search} 
                        alt="lupa" 
                        onClick={() => navigate(`/search?query=${query}`)}
                    />
                    <input 
                        placeholder="Restaurante"
                        name="query"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />
                </form>

                {!allRestaurants && loading && 
                    <div className="loading">
                        <ReactLoading type="spinningBubbles" color="#e8222e"/>
                    </div>
                }

                {!allRestaurants && !loading && error &&
                    <div className="error--message">
                        Erro: {error.error.message}
                    </div>
                }

                {restSearch && restSearch.length === 0 && 
                    <div> Não encontramos :&#40; </div>
                }

                <div className="restaurants">
                    {restSearch && restSearch.length > 0 &&
                        restSearch.map((iten, index) => {
                            return(
                                <div 
                                    className="rest--container" 
                                    key={index}
                                    onClick={() => navigate(`/restaurant/${iten.id}`)}
                                >
                                    <div className="rest--image">
                                        <img src={iten.logoUrl} alt=""/>
                                    </div>

                                    <div className="rest--infos">
                                        <span className="rest--info--name"> {iten.name} </span>
                                        <div className="rest--infos--details">
                                            <span> {iten.deliveryTime} min</span>
                                            <span> Frete {iten.shipping ? `R$ ${iten.shipping.toFixed(2)}` : "Grátis"} </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>                
            </div>
        </PageArea>
    )
};

export default SearchPage;