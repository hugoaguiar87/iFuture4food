import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PageArea } from "./style";

import { requestApi } from "../../helpers/Requests";

import search from "../../assets/search.svg";
import avatarcart from "../../assets/avatarcart.svg";
import homecart from "../../assets/homecart.svg";
import shoppingcart from "../../assets/shoppingcart.svg";

const FeedPage = () => {
    const [allRestaurants, setAllRestaurants] = useState(null);
    const [categories, setCategories] = useState([]);

    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setToken(Cookies.get('token'));
    }, []);

    useEffect(() => {
        const getRestaurants = async() => {
            const rest = await requestApi.restaurants(token);
            if(rest.error){
                setError(rest);
            } else {
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

    console.log(allRestaurants)

    return(
        <PageArea>
                <div className="title">
                    <span>Ifuture</span>
                </div>

                <div className="body">
                    <div className="search">
                        <img src={search} alt="lupa"/>
                        <input 
                            placeholder="Restaurante"
                        />
                    </div>

                    <div className="categories">
                        <div className="categories--list">
                            { categories.length > 0 && categories.map((iten, key) => {
                                return(
                                    <div key={key} className="categories--iten">
                                        {iten}
                                    </div>
                                )
                            }) }
                        </div>
                        
                    </div>

                    <div className="restaurants">
                        {allRestaurants && allRestaurants.restaurants.length > 0 && allRestaurants.restaurants.map((iten, index) => {
                            return(
                                <div className="rest--container" key={index}>
                                    <div className="rest--image">
                                        <img src={iten.logoUrl} alt=""/>
                                    </div>

                                    <div className="rest--infos">
                                        <span className="rest--info--name"> {iten.name} </span>
                                        <div className="rest--infos--details">
                                            <span> {iten.deliveryTime} min</span>
                                            <span> Frete R$ {iten.shipping.toFixed(2)} </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div className="cards">
                    <div>
                        <img src={homecart} alt=""/>
                    </div>

                    <div>
                        <img src={shoppingcart} alt=""/>
                    </div>

                    <div>
                        <img src={avatarcart} alt=""/>
                    </div>
                </div>
        </PageArea>
    );
};

export default FeedPage;