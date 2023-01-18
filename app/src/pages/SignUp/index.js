import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageArea } from "./style";

import logo2 from "../../assets/logo2.svg";
import pass from "../../assets/pass.svg";
import pass2 from "../../assets/pass2.svg";
import { requestApi } from "../../helpers/Requests";
import { doLogin } from "../../helpers/AuthHandler";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [idCode, setIdCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null)

    const cpfMask = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError(null);

        if(password !== confirmPassword){
            setError({error: { message: "Senhas diferentes." }});
            setDisabled(false);
            return;
        };
        
        if( password.length < 6 ){
            setError({error: { message: "A senha deve conter no mínimo 6 caracteres." } });
            setDisabled(false);
            return;
        };

        const data = await requestApi.register(name, email, idCode, password);

        if(data.error){
            setError(data);
        } else {
            doLogin(data.token);
            navigate("/cadastrar-endereco");
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
                    <span> Cadastrar </span>
                </div>

                { error && 
                    <div className="error--message"> {error.error.message} </div>
                }

                <form>
                    <fieldset>
                        <legend>Nome*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Nome e sobrenome"
                                type="text"
                                value={name}
                                onChange={ (e) => setName(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </fieldset>

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
                        <legend>CPF*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="000.000.000-00"
                                type="text"
                                value={idCode}
                                onChange={ (e) => setIdCode(cpfMask(e.target.value)) }
                                maxLength="14"
                                disabled={disabled}
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Senha*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Mínimo 6 caracteres"
                                type={ showPassword ? "text" : "password" }
                                value={password}
                                onChange={ (e) => setPassword(e.target.value) }
                                minLength="6"
                                disabled={disabled}
                                required
                            />
                            <img 
                                src={ showPassword ? pass2 : pass } 
                                alt="ícone mostrar senha"
                                onClick={ () => setShowPassword(!showPassword) }
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Confirmar*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Confirme a senha anterior"
                                type={ showConfirmPassword ? "text" : "password" }
                                value={confirmPassword}
                                onChange={ (e) => setConfirmPassword(e.target.value) }
                                minLength="6"
                                disabled={disabled}
                                required
                            />
                            <img 
                                src={ showConfirmPassword ? pass2 : pass } 
                                alt="ícone mostrar senha"
                                onClick={ () => setShowConfirmPassword(!showConfirmPassword) }
                            />
                        </div>
                    </fieldset>

                    <button onClick={handleSubmit} disabled={disabled}>Criar</button>
                </form>

            </div>
        </PageArea>
    );
};

export default SignUpPage;