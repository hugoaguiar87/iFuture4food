import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageArea } from "./style";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/tokenReducer";

import logo2 from "../../assets/logo2.svg";
import pass from "../../assets/pass.svg";
import pass2 from "../../assets/pass2.svg";

import { requestApi } from "../../helpers/Requests";
import { doLogin, isLogged } from "../../helpers/AuthHandler";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        const logged = isLogged();

        if(logged){
            const token = Cookies.get('token');
            dispatch(setToken(token));

            const getUser = async() => {
                const user = await requestApi.profile(token);

                if(user.user.hasAddress){
                    navigate('/feed');
                } else {
                    navigate('/cadastrar-endereco');
                };
            };

            getUser();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError(null)

        const data = await requestApi.login(email, password);

        if(data.error){
            setError(data);
        } else {
            doLogin(data.token);
            dispatch(setToken(data.token));
            if(data.user.hasAddress){
                navigate("/feed");
            } else {
                navigate("/cadastrar-endereco")
            };            
        };

        setDisabled(false);
    };

    return(
        <PageArea>
            <div className="container">
                <div className="logo">
                    <img src={logo2} alt="logo iFuture"/>
                </div>

                <div className="tittle">
                    <span> Entrar </span>
                </div>

                { error && 
                    <div className="error--message"> {error.error.message} </div>
                }

                <form >
                    <fieldset>
                        <legend>Email*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="email@email.com"
                                type="email"
                                value={email}
                                onChange={ (e) => setEmail(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Senha*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="M??nimo 6 caracteres"
                                type={ showPassword ? "text" : "password" }
                                value={password}
                                onChange={ (e) => setPassword(e.target.value) }
                                minLength="6"
                                disabled={disabled}
                                required
                            />
                            <img 
                                src={ showPassword ? pass2 : pass } 
                                alt="??cone mostrar senha"
                                onClick={ () => setShowPassword(!showPassword) }
                            />
                        </div>
                    </fieldset>

                    <button onClick={handleSubmit} disabled={disabled}>Entrar</button>
                </form>

                <div className="register">
                    <span> N??o possui cadastro? <a href="/cadastrar">Clique aqui.</a> </span>
                </div>
            </div>
           
        </PageArea>
    );
};

export default LoginPage;