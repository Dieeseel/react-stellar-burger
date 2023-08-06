import { urlApi } from "../utils/data";

const checkReponses = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsRequest = async () => {
    return fetch(`${urlApi}/ingredients`)
        .then(res => checkReponses(res))
        .catch(err => console.log(err))
}


export const makeNewOrder = (data) => {
    return fetch(`${urlApi}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ingredients: data
        })
    })
        .then(res => checkReponses(res))
}

