import { signUpRequest, loginRequest, fetchWithRefresh, signOutRequest, patchUserDataRequest, resetPasswordRequest, changePasswordRequest } from "../api"
import { setCookie, getCookie, deleteCookie } from "../cookie"

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

export const CHECK_AUTH = 'CHECK_AUTH'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILED  = 'SIGN_OUT_FAILED '

export const SAVE_DATA_REQUEST = 'SAVE_DATA_REQUEST'
export const SAVE_DATA_SUCCESS = 'SAVE_DATA_SUCCESS'
export const SAVE_DATA_FAILED = 'SAVE_DATA_FAILED'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS '
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED'

export const signUp = (userData) => {
    return function(dispatch) {
        dispatch({
            type: SIGN_UP_REQUEST
        });
        signUpRequest(userData)
            .then(res => {
                let accessToken, refreshToken
                if (res.success && res) {
                    dispatch({
                        type: SIGN_UP_SUCCESS,
                        userData: res
                    })
                    accessToken = res.accessToken.split('Bearer ')[1]; 
                    refreshToken = res.refreshToken

                    if (accessToken && refreshToken) {
                        setCookie('accessToken', accessToken)
                        setCookie('refreshToken', refreshToken);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: SIGN_UP_FAILED,
                    message: err.message
                });
            })
    }
}


export const signIn = (userData) => {
    return function(dispatch) {
        dispatch({
            type: SIGN_IN_REQUEST
        })
        loginRequest(userData)
            .then(res => {
                let accessToken, refreshToken
                if (res.success && res) {
                    dispatch({
                        type: SIGN_IN_SUCCESS,
                        userData: res
                    })
                    
                    accessToken = res.accessToken.split('Bearer ')[1]; 
                    refreshToken = res.refreshToken

                    if (accessToken && refreshToken) {
                        setCookie('accessToken', accessToken)
                        setCookie('refreshToken', refreshToken);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: SIGN_IN_FAILED,
                });
            })
    }
}

export const getUser = () => {
    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        fetchWithRefresh(getCookie('accessToken'))
            .then(res => {
                if (res.success && res) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        userData: res
                    })
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_USER_FAILED,
                });
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
            })
            .finally(() => {
                dispatch({
                    type: CHECK_AUTH
                }) 
            })
    }
}


export const checkAuth = () => {
    return (dispatch) => {
        if (getCookie('accessToken')) {
            dispatch(getUser())
        }
        else {
            dispatch({
                type: CHECK_AUTH
            })
        }
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: SIGN_OUT_REQUEST
        })
        signOutRequest(getCookie('refreshToken'))
            .then(res => {
                if (res.success && res) {
                    dispatch({
                        type: SIGN_OUT_SUCCESS
                    })
                    deleteCookie('accessToken')
                    deleteCookie('refreshToken')
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: SIGN_OUT_FAILED
                })
            })
    }
}


export const saveNewData = (userData) => {
    return function(dispatch) {
        dispatch({
            type: SAVE_DATA_REQUEST
        })
        patchUserDataRequest(userData, getCookie('accessToken'))
            .then(res => {
                if (res.success && res) {
                    dispatch({
                        type: SAVE_DATA_SUCCESS,
                        userData: res
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: SAVE_DATA_FAILED,
                });
            })
    }
}

export const resetPassword = (email) => {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
        resetPasswordRequest(email)
            .then (res => {
                if (res.success && res) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
                console.log(err)
            })
    }
}

export const changePassword = (data) => {
    return function(dispatch) {
        dispatch({
            type: CHANGE_PASSWORD_REQUEST
        })
        console.log(data)
        changePasswordRequest(data)
            .then(res => {
                if (res.success && res) {
                    dispatch({
                        type: CHANGE_PASSWORD_SUCCESS
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: CHANGE_PASSWORD_FAILED
                })
                console.log(err)
            })
    }
}