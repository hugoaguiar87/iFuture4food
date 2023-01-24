import styled from "styled-components";

export const PageArea = styled.div`
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;

    .title{
        border-bottom: 1px solid #DDD;
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* font-size: 20px; */
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 999;
        background-color: #FFF;

        span{
            flex: 1;
            font-size: 20px;
            text-align: center;
        };

        img{
            cursor: pointer;
            margin-left: 15px;
        };
    };
`;