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

    .container img{
        height: 100%;
        width: 100%;
    }
`