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

    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: calc(100vh - 80px);
        margin-top: 80px;
        margin-bottom: 50px;
    };

    .body .restaurant{
        width: 30.5rem;
        height: 21rem;
        margin-bottom: 20px;
    };

    .body .restaurant .rest--image{
        height: 50%;
        width: 100%;
        margin-bottom: 15px;
    };

    .body .restaurant .rest--image img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    };

    .body .restaurant .rest--name{
        font-size: 20px;
        color: #e8222e;
        margin-bottom: 15px;
    };

    .body .restaurant .rest--categ, .body .restaurant .rest--infos, .body .restaurant .rest--address{
        color: #b8b8b8;
        margin-bottom: 15px;
        font-size: 20px;
    };

    .body .restaurant .rest--infos span{
        margin-right: 100px;
    };
    
    .body .category--container{
        width: 100vw;
        padding: 0 50px;
        margin-bottom: 30px;
    };

    .body .category--container .category--name{
        font-size: 1.125rem;
        font-weight: bold;
    };

    .body .category--container .product--area{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    };

    .body .category--container .product--area .product--container{
        border: solid 1px #b8b8b8;
        border-radius: 8px;
        width: 28.5rem;
        height: 12rem;
        margin: 10px;
        display: flex;
    };

    .body .category--container .product--area .product--container .product--image{
        width: 8.6rem;
        height: 100%;
    };

    .body .category--container .product--area .product--container .product--image img{
        height: 100%;
        width: 8.6rem;
        object-fit: cover;
        border-radius: 8px;
    };

    .body .category--container .product--area .product--container .product--infos .qtd{
        /* position: relative; */
        z-index: 999;
        /* left: 100%; */
        margin: 0;
        /* right: 20px; */
        /* top: 0; */
        /* right: 0; */
        font-size: 50px;
        width: 40px;
        height: 80px;
        background-color: green;
    };
`;