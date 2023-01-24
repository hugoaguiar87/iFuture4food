import styled from "styled-components";

export const PageArea = styled.div`
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    /* margin: 0 530px ; */
    overflow-x: hidden;

    .title{
        border-bottom: 1px solid #DDD;
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 999;
        background-color: #FFF;
    };

    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        margin-top: 80px;
        margin-bottom: 95px;
    };

    .body .search{
        display: flex;
        align-items: center;
        justify-content: center;
        /* margin-top: 80px; */
        margin-bottom: 30px;
        border: 1px solid #b8b8b8;
        height: 70px;
        border-radius: 2px;
        padding: 20px;
    };

    .body .search img{
        height: 100%;
        cursor: pointer;
    };

    .body .search input{
        flex: 1;
        color: #000;
        border: none;
        margin: 0;
        padding: 10px;
        outline: 0;
        font-size: 1rem;

        &::placeholder{
            color: #d0d0d0;
        };
    };

    .body .categories{
        font-size: 20px;
        min-height: 80px;
        width: 100vw;
        margin-bottom: 25px;
    };

    .body .categories--list{
        height: 100%;
        display: flex;
        /* align-items: center; */
        justify-content: center;
        flex-wrap: wrap;
    };

    .body .categories .categories--iten{
        margin: 5px 15px;
        cursor: pointer;
    };

    .body .categories .active{
        color: #e8222e;
    };

    .body .restaurants{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    };

    .body .rest--container{
        border: 1px solid #b8b8b8;
        border-radius: 8px;
        width: 20.5rem;
        height: 11.75rem;
        margin: 10px;
        cursor: pointer;
        transform: scale(0.9);
        transition: all ease 0.3s;

        &:hover{
            transform: scale(1);
        };
    };

    .body .rest--image{
        width: 100%;
        height: 7.5rem;
    };

    .body .rest--image img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
    };

    .body .rest--infos{
        margin-top: 10px;
        padding: 0 10px;
        font-size: 18px;
    };

    .body .rest--infos .rest--info--name{
        color: #e8222e;
    };

    .body .rest--infos .rest--infos--details{
        display: flex;
        justify-content: space-between;
        color: #b8b8b8;
    };

    .cards{
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #DDD;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        height: 90px;
        gap: 150px;
        background-color: #FFF;
    };

    .cards img{
        height: 50px;
        cursor: pointer;
    };

    .error--message {
        background-color: #FFCACA;
        margin: 10px 0;
        color: #000;
        border: 2px solid #FF0000;
        padding: 10px;
        max-width: 20.5rem;
        opacity: 0.8;
        font-size: 25px;
    };
`;