import styled from "styled-components";

export const PageArea = styled.div`
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Roboto', sans-serif;

    .container{
        border: 1px solid #DDD;
        height: 80%;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    };

    .logo {
        width: 150px;
    }

    .logo img {
        width: 100%;
    }

    .tittle span {
        font-size: 25px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 100%;
    }

    form fieldset {
        border-radius: 2px;
        border: 1px solid #b8b8b8;
        width: 20.5rem;
        height: 4rem;
        display: flex;
    }

    form legend {
        color: #b8b8b8;
        font-size: 0.75rem;
        padding-right: 20px;
        padding-left: 5px;
    }

    form .input--area{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    form .input--area input{
        flex: 1;
        color: #000;
        border: none;
        margin: 0;
        padding: 10px;
        outline: 0;
        font-size: 1rem;

        &::placeholder{
            color: #d0d0d0;
        }
    }

    form .input--area img{
        cursor: pointer;
    }

    form button {
        background-color: #e8222e;
        border-radius: 2px;
        border: none;
        width: 20.5rem;
        height: 2.625rem;
        color: #000;
        font-size: 1rem;
        cursor: pointer;
        transition: all ease 0.3s;

        &:hover{
            opacity: 0.8;
        }
    }

    .register a{
        text-decoration: none;
        color: #000;
    }

    .error--message {
        background-color: #FFCACA;
        margin: 10px 0;
        color: #000;
        border: 2px solid #FF0000;
        padding: 10px;
        max-width: 20.5rem;
        opacity: 0.8;
    }
`;