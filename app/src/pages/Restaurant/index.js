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
    const [products, setProducts] = useState([]);

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
            setProducts(restInfos.restaurant.products);
        };
    }, [restInfos]);

    console.log(restInfos)
    console.log(products)

    return(
        <PageArea>
            <div className="title">
                <img src={back} alt="Voltar" onClick={() => navigate("/feed")}/>
                <span>Restaurante</span>
            </div>

            <div className="body">
                {restInfos &&
                    <div className="restaurant">
                        <div className="rest--image">
                            <img src={restInfos.restaurant.logoUrl} alt="Logo"/>
                        </div>

                        <div className="rest--name">
                            <span>{restInfos.restaurant.name}</span>
                        </div>

                        <div className="rest--categ">
                            <span>{restInfos.restaurant.category}</span>
                        </div>

                        <div className="rest--infos">
                            <span>{restInfos.restaurant.deliveryTime} min</span>
                            <span>Frete {restInfos.restaurant.shipping ? `R$ ${restInfos.restaurant.shipping.toFixed(2)}` : "Grátis"}</span>
                        </div>

                        <div className="rest--address">
                            <span>{restInfos.restaurant.address}</span>
                        </div>
                    </div>
                }

                {categories && categories.length > 0 &&
                    categories.map((iten, index) => {
                        return(
                            <div className="category--container" key={index}>
                                <div className="category--name">
                                    <span>{iten}</span>
                                    <hr noshade="noshade"/>
                                </div>

                                <div className="product--area">
                                    {products && products.length > 0 && 
                                        products.filter((i) => {
                                            if(i.category === iten){
                                                return true
                                            } else {
                                                return false
                                            }
                                        }).map((p, pKey) => {
                                            return(
                                                <div className="product--container" key={pKey}>
                                                    <div className="product--image">
                                                        <img src={p.photoUrl} alt="Product"/>
                                                    </div>

                                                    <div className="product--infos">
                                                        <span className="qtd">2</span>
                                                        <button>Adicionar</button>

                                                        <div className="product--details">
                                                            <span>{p.name}</span>
                                                            <span>{p.description}</span>
                                                            <span>R$ {p.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </PageArea>
    );
};

export default RestaurantPage;