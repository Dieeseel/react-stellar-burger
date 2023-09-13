import { urlApi } from "../utils/data";
import { setCookie } from "./cookie";

const checkReponses = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsRequest = async () => {
    return fetch(`${urlApi}/ingredients`)
        .then(res => checkReponses(res))
        .catch(err => console.log(err))
}


export const makeNewOrder = async (data) => {
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

export const signUpRequest = (data) => {
  return fetch(`${urlApi}/auth/register`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
      .then(res => checkReponses(res))
}

export const loginRequest = async (userData) => {
    return fetch(`${urlApi}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })  
        .then(res => checkReponses(res))
}

export const getUserRequest = async (accessToken) => {
    return fetch(`${urlApi}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      .then(res => checkReponses(res)); 
}

export const refreshToken = (refreshToken) => {
    return fetch(`${urlApi}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: refreshToken
      }),
    })
    .then(res => checkReponses(res));
};

export const fetchWithRefresh = async (token) => {
    try {
      const res = await getUserRequest(token);
      return res;
    } 
    catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); 
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1])
        setCookie('refreshToken', refreshData.refreshToken);
        
        const res = await getUserRequest(refreshData.accessToken.split('Bearer ')[1]); 
        return await checkReponses(res);
      } 
      else {
        return Promise.reject(err);
      }
    }
};

export const signOutRequest = (refreshToken) => {
    return fetch(`${urlApi}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: refreshToken
      }),
    })
    .then(res => checkReponses(res));
}


export const patchUserDataRequest = async (data, cookie) => {
  return fetch(`${urlApi}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookie
      },
      body: JSON.stringify(data),
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
  })
      .then(res => checkReponses(res)); 
}

export const resetPasswordRequest = (email) => {
    return fetch(`${urlApi}/password-reset`, {
        method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(email),
    })
    .then(res => checkReponses(res));
}

export const changePasswordRequest = (data) => {
    return fetch(`${urlApi}/password-reset/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(res => checkReponses(res));
}