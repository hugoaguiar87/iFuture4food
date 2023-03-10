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

    return req;
};

const putAddress = async (token, street, number, neighbourhood, city, state, complement = null) => {
    const body = { street, number, neighbourhood, city, state, complement };

    const header = {
        headers: {
            'auth': token
        }
    };

    const req = await axios.put(`${Api_UrlBase}/address`, body, header)
        .then((res) => { return res.data })
        .catch((error) => { return { error: error.response.data } });

    return req;
};

const getProfile = async (token) => {
    const header = {
        headers: {
            'auth': token
        }
    };

    const req = await axios.get(`${Api_UrlBase}/profile`, header)
        .then((res) => { return res.data })
        .catch((error) => { return { error: error.response.data } });
    
    return req;
};

const getRestaurants = async (token) => {
    const header = {
        headers: {
            'auth': token
        }
    };

    const req = await axios.get(`${Api_UrlBase}/restaurants`, header)
        .then((res) => { return res.data })
        .catch((error) => { return { error: error.response.data } });
    
    return req;
};

const getRestaurantDetails = async (token, id) => {
    const header = {
        headers: {
            'auth': token
        }
    };

    const req = await axios.get(`${Api_UrlBase}/restaurants/${id}`, header)
        .then((res) => { return res.data })
        .catch((error) => { return { error: error.response.data } });
    
    return req;    
};

export const requestApi = {
    login: async (email, password) => {
        return await postSignIn(email, password);
    },
    register: async (name, email, cpf, password) => {
        return await postSignUp(name, email, cpf, password);
    },
    address: async (token, street, number, neighbourhood, city, state, complement = null) => {
        return await putAddress(token, street, number, neighbourhood, city, state, complement = null);
    },
    profile: async (token) => {
        return await getProfile(token);
    },
    restaurants: async (token) => {
        return await getRestaurants(token);
    },
    restaurantDetails: async (token, id) => {
        return await getRestaurantDetails(token, id);
    }
};