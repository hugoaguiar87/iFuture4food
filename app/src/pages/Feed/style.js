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
    /* overflow-x: hidden; */

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
    };

    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
    };

    .body .search{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80px;
        margin-bottom: 30px;
        border: 1px solid #b8b8b8;
        height: 70px;
        border-radius: 2px;
        padding: 20px;
    };

    .body .search img{
        height: 100%;
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
        margin-bottom: 40px;
    };

    .body .categories--list{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    };

    .body .categories .categories--iten{
        margin: 5px 15px;
        cursor: pointer;
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
        cursor: pointer;
    };

    .cards img{
        height: 50px;
    }
`;