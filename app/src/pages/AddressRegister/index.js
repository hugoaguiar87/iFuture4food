import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageArea } from "./style";
import { doLogin, isLogged } from "../../helpers/AuthHandler";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../helpers/Requests";
import { setToken } from "../../redux/reducers/tokenReducer";

const AddressRegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [complement, setComplement] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);

    const token = useSelector((state) => state.reducer.configToken.token);

    useEffect(() => {
        let logged = isLogged();

        if(!logged){
            navigate("/");
        }; 

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setDisabled(true);

        const data = await requestApi.address(token, street, number, neighbourhood, city, state, complement);

        if(data.error){
            setError(data);
        } else {
            doLogin(data.token);
            dispatch(setToken(data.token));
            navigate("/feed");
        };

        setDisabled(false);
    };

    return(
        <PageArea>
            <div className="container">
                <div className="tittle">
                    <span> Meu Endereço </span>
                </div>

                { error && 
                    <div className="error--message"> {error.error.message} </div>
                }

                <form>
                    <fieldset>
                        <legend>Logradouro*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Rua / Av."
                                type="text"
                                value={street}
                                onChange={ (e) => setStreet(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Número*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Número"
                                type="number"
                                value={number}
                                onChange={ (e) => setNumber(e.target.value) }
                                disabled={disabled}
                                min="0"
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Complemento</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Apto. / Bloco"
                                type="text"
                                value={complement}
                                onChange={ (e) => setComplement(e.target.value) }
                                disabled={disabled}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Bairro*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Bairro"
                                type="text"
                                value={neighbourhood}
                                onChange={ (e) => setNeighbourhood(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Cidade*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Cidade"
                                type="text"
                                value={city}
                                onChange={ (e) => setCity(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Estado*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Estado"
                                type="text"
                                value={state}
                                onChange={ (e) => setState(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </fieldset>

                    <button onClick={handleSubmit} disabled={disabled}> Salvar </button>
                </form>

            </div>
        </PageArea>
    );
};

export default AddressRegisterPage;