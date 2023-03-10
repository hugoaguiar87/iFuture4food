import { ModalArea, PageArea } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

import { requestApi } from "../../helpers/Requests";
import { setCart } from "../../redux/reducers/cartReducer";

import back from "../../assets/back.svg";
import Modal from "../../components/Modal";

const RestaurantPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const [restInfos, setRestInfos] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const token = useSelector((state) => state.reducer.configToken.token);
    const cart = useSelector((state) => state.reducer.configCart.cart);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalAddQuantity, setModalAddQuantity] = useState(false);
    const [productModal, setProductModal] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getRest = async (tokenId, restId) => {
            setLoading(true);
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

    const addQuantity = () => {
        const modalClose = () => {
            setModalAddQuantity(false);
            setProductModal(null);
            setQuantity(1);
        };

        const increase = () => {
            setQuantity(quantity+1);
        };

        const decrease = () => {
            if(quantity > 1){
                setQuantity(quantity-1);
            };
        };

        const addCart = () => {
            let newCart = JSON.parse(JSON.stringify(cart));
            
            let key = newCart.findIndex((item) => { return item.product.id === productModal.id });

            if(key > -1){
                newCart[key].qt += quantity;
            } else {
                newCart.push({
                    product: productModal,
                    qt: quantity
                });
            };
            
            dispatch(setCart(newCart));
            setModalAddQuantity(false);
            setProductModal(null);
            setQuantity(1);
        };

        return(
            <ModalArea>
                {modalAddQuantity ?
                    <Modal onClose={() => modalClose()}>
                        <div className="modal--product">
                           <div className="modal--product--image">
                                <img src={productModal.photoUrl} alt="Imagem do Produto"/>
                           </div>

                           <div className="modal--product--infos">
                                <div className="name--desc">
                                    <span className="name">{productModal.name}</span>
                                    <span className="desc">{productModal.description}</span>
                                </div>

                                <div className="buttons--price">
                                    <div className="buttons">
                                        <span onClick={decrease}>-</span>
                                        <span>{quantity}</span>
                                        <span onClick={increase}>+</span>
                                    </div>
                                    
                                    <span className="price">R$ {(quantity*productModal.price).toFixed(2)}</span>
                                </div>
                           </div>
                        </div>

                        <div className="modal--buttons">
                            <button onClick={modalClose}>Cancelar</button>
                            <button className="big" onClick={addCart}>Adicionar ao Carrinho</button>
                        </div>
                    </Modal>
                    : null
                }
            </ModalArea>
        )
    };

    const openModal = (product) => {
        setProductModal(product);
        setModalAddQuantity(true);
    };

    const removeProduct = (product) => {
        let newCart = JSON.parse(JSON.stringify(cart));

        const index = newCart.findIndex((iten) => {return iten.product.id === product.id});

        if( index > -1 ){
            newCart.splice(index, 1);
        };

        dispatch(setCart(newCart));
    };

    return(
        <PageArea>
            <div className="title">
                <img src={back} alt="Voltar" onClick={() => navigate("/feed")}/>
                <span>Restaurante</span>
            </div>

            <div className="body">

                { !restInfos && loading &&
                    <div className="loading">
                        <ReactLoading type="spinningBubbles" color="#e8222e"/>
                    </div>
                }

                { !restInfos && !loading && error &&
                    <div className="error--message">
                        Erro: {error.error.message}
                    </div>
                }

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
                            <span>Frete {restInfos.restaurant.shipping ? `R$ ${restInfos.restaurant.shipping.toFixed(2)}` : "Gr??tis"}</span>
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
                                                        <div className="product--details">
                                                            <span className="name">{p.name}</span>
                                                            <span className="description">{p.description}</span>
                                                            <span className="price">R$ {p.price.toFixed(2)}</span>
                                                        </div>

                                                        <div className="product--buttons">
                                                            { cart.findIndex((item) => {return item.product.id === p.id}) > -1 
                                                                ?
                                                                    cart.filter((i, k) => {
                                                                        return i.product.id === p.id
                                                                    }).map((it, key) => {
                                                                        return (
                                                                            <span className="qtd" key={key}>
                                                                                {it.qt}
                                                                            </span>
                                                                        )
                                                                    })
                                                                :
                                                                <span className="none">

                                                                </span>
                                                            }

                                                            { cart.findIndex((item) => {return item.product.id === p.id}) > -1
                                                                ?
                                                                    <button className="remove" onClick={() => removeProduct(p)}>
                                                                        remove
                                                                    </button>
                                                                :
                                                                    <button onClick={() => openModal(p)}>
                                                                        adicionar
                                                                    </button>

                                                            }
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

            {addQuantity()}
        </PageArea>
    );
};

export default RestaurantPage;