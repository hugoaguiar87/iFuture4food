import { PageArea } from "./style";

import logo2 from "../../assets/logo2.svg";
import pass from "../../assets/pass.svg";
import pass2 from "../../assets/pass2.svg";

const LoginPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <PageArea>
            <div className="container">
                <div className="logo">
                    <img src={logo2} alt="logo iFuture"/>
                </div>

                <div className="tittle">
                    <span> Entrar </span>
                </div>

                <form >
                    <fieldset>
                        <legend>Email*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="email@email.com"
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Senha*</legend>
                        <div className="input--area">
                            <input 
                                placeholder="Mínimo 6 caracteres"
                            />
                            <img src={pass} alt=""/>
                        </div>
                    </fieldset>

                    <button onClick={handleSubmit}>Entrar</button>
                </form>

                <div className="register">
                    <span> Não possui cadastro? <a href="/">Clique aqui.</a> </span>
                </div>
            </div>
           
        </PageArea>
    );
};

export default LoginPage;