import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PageArea } from "./style";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import { requestApi } from "../../helpers/Requests";

import search from "../../assets/search.svg";
import avatarcart from "../../assets/avatarcart.svg";
import homecart from "../../assets/homecart.svg";
import shoppingcart from "../../assets/shoppingcart.svg";

const FeedPage = () => {
    const navigate = useNavigate();

    const [allRestaurants, setAllRestaurants] = useState(null);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(null);

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
                setLoading(false)
                setAllRestaurants(rest);
                setError(null);
            };            
        };

        if(token !== null){
            getRestaurants();
        };
        
    }, [token]);

    useEffect(() => {
        if(allRestaurants !== null){
            let arrayCategories = [];
            for(let i of allRestaurants.restaurants){
                if(!arrayCategories.includes(i.category)){
                    arrayCategories.push(i.category);
                }
            };

            setCategories(arrayCategories)
        };
    }, [allRestaurants]);

    const handleActiveCategory = (cat) => {
        if(cat === active){
            setActive(null);
        } else {
            setActive(cat);
        };
    };

    console.log(error)

    return(
        <PageArea>
                <div className="title">
                    <span>Ifuture</span>
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

                    <div className="categories">
                        <div className="categories--list">
                            { categories.length > 0 && categories.map((iten, key) => {
                                return(
                                    <div 
                                        key={key} 
                                        className={active === iten ? "categories--iten active" : "categories--iten"} 
                                        onClick={() => handleActiveCategory(iten)}
                                    >
                                        {iten}
                                    </div>
                                )
                            }) }
                        </div>
                        
                    </div>

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

                    <div className="restaurants">
                        {allRestaurants && allRestaurants.restaurants.length > 0 && 
                            allRestaurants.restaurants.filter((i) => {
                                if(!active){
                                    return true
                                } else if (active && i.category === active){
                                    return true
                                } else {
                                    return false
                                };

                            }).map((iten, index) => {
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

                <div className="cards">
                    <div>
                        <img src={homecart} alt=""/>
                    </div>

                    <div>
                        <img 
                            src={shoppingcart} 
                            alt=""
                            onClick={() => alert("Página em construção!")}
                        />
                    </div>

                    <div>
                        <img 
                            src={avatarcart} 
                            alt=""
                            onClick={() => alert("Página em construção!")}
                        />
                    </div>
                </div>
        </PageArea>
    );
};

export default FeedPage;