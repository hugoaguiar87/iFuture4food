import axios from "axios";

const Api_UrlBase = "https://us-central1-missao-newton.cloudfunctions.net/fourFoodB";

const postSignIn = async (email, password) => {
    const body = { email, password };

    const req = await axios.post(`${Api_UrlBase}/login`, body)
        .then((res) => { return res.data })
        .catch((error) => { return {error: error.response.data} });

    return req;
};

const postSignUp = async (name, email, cpf, password) => {
    const body = { name, email, cpf, password };

    const req = await axios.post(`${Api_UrlBase}/signup`, body)
        .then((res) => { return res.data })
        .catch((error) => { return { error: error.response.data } });

    return req
};

export const requestApi = {
    login: async (email, password) => {
        return await postSignIn(email, password);
    },
    register: async (name, email, cpf, password) => {
        return await postSignUp(name, email, cpf, password);
    }
};