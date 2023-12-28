import { urlApi } from "../utils/data";
import { setCookie } from "./cookie";
import { TSignInData, TLoginData, TChangePasswordData } from "./types/data";

const checkReponses = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};

export const getIngredientsRequest = async () => {
    return fetch(`${urlApi}/ingredients`)
        .then(res => checkReponses(res))
        .catch(err => console.log(err))
}


export const makeNewOrder = (data: string[], token: string | undefined) => {
    return fetch(`${urlApi}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            ingredients: data
        })
    })
        .then(checkReponses)
}

export const signUpRequest = (data: TSignInData) => {
  return fetch(`${urlApi}/auth/register`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
      .then(checkReponses)
}

export const loginRequest = async (userData: TLoginData) => {
    return fetch(`${urlApi}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })  
        .then(checkReponses)
}

export const getUserRequest = async (accessToken: string | undefined) => {
    return fetch(`${urlApi}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      .then(checkReponses) 
}

export const refreshTokenRequest = async (refreshToken: string | undefined) => {
    return fetch(`${urlApi}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: refreshToken
      }),
    })
    .then(checkReponses)
};

export const fetchWithRefresh = async (accessToken: string | undefined, refreshToken: string | undefined) => {
    try {
      const res = await getUserRequest(accessToken);
      return res;
    } 
    catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshTokenRequest(refreshToken); 
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1])
        setCookie('refreshToken', refreshData.refreshToken);
        
        const res = await getUserRequest(refreshData.accessToken.split('Bearer ')[1]); 
        return checkReponses(res);
      } 
      else {
        return Promise.reject(err);
      }
    }
};

export const signOutRequest = (refreshToken: string | undefined) => {
    return fetch(`${urlApi}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: refreshToken
      }),
    })
    .then(checkReponses);
}


export const patchUserDataRequest = async (data: TSignInData, cookie: string | undefined) => {
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
      .then(checkReponses); 
}

export const resetPasswordRequest = (email: {email: string}) => {
    return fetch(`${urlApi}/password-reset`, {
        method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(email),
    })
    .then(checkReponses);
}

export const changePasswordRequest = (data: TChangePasswordData) => {
    return fetch(`${urlApi}/password-reset/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(checkReponses);
}