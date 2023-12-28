import { TUserData, TLoginData, TSignInData, TChangePasswordData, TSignUpData } from "../types/data";
import { AppDispatch } from "../types";
import { setCookie, getCookie, deleteCookie } from "../cookie"
import { 
    signUpRequest, 
    loginRequest, 
    fetchWithRefresh, 
    signOutRequest, 
    patchUserDataRequest, 
    resetPasswordRequest, 
    changePasswordRequest 
} from "../api"
import { 
    SIGN_UP_REQUEST, SIGN_UP_FAILED, SIGN_UP_SUCCESS,
    SIGN_IN_REQUEST, SIGN_IN_FAILED, SIGN_IN_SUCCESS,
    GET_USER_REQUEST, GET_USER_FAILED, GET_USER_SUCCESS,
    SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED,
    SAVE_DATA_REQUEST, SAVE_DATA_FAILED, SAVE_DATA_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED,
    CHECK_AUTH
} from "../constants/constatnts"


export interface ISignUpAction {
    readonly type: typeof SIGN_UP_REQUEST;
}

export interface ISignUpSuccessAction {
    readonly type: typeof SIGN_UP_SUCCESS;
    userData: TSignUpData
}

export interface ISignUpFailedAction {
    readonly type: typeof SIGN_UP_FAILED;
}

export interface ISignInAction {
    readonly type: typeof SIGN_IN_REQUEST;
}

export interface ISignInSuccessAction {
    readonly type: typeof SIGN_IN_SUCCESS;
    userData: TUserData
}

export interface ISignInFailedAction {
    readonly type: typeof SIGN_IN_FAILED;
}

export interface IGetUserAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    userData: TUserData
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface ICheckAuthAction {
    readonly type: typeof CHECK_AUTH;
}

export interface ISignOutAction {
    readonly type: typeof SIGN_OUT_REQUEST;
}

export interface ISignOutSuccessAction {
    readonly type: typeof SIGN_OUT_SUCCESS;
}

export interface ISignOutFailedAction {
    readonly type: typeof SIGN_OUT_FAILED;
}

export interface ISaveNewDataAction {
    readonly type: typeof SAVE_DATA_REQUEST
}

export interface ISaveNewDataSuccessAction {
    readonly type: typeof SAVE_DATA_SUCCESS
    readonly userData: TUserData
}

export interface ISaveNewDataFailedAction {
    readonly type: typeof SAVE_DATA_FAILED
}

export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED
}

export interface IChangePasswordAction {
    readonly type: typeof CHANGE_PASSWORD_REQUEST
}

export interface IChangePasswordSuccessAction {
    readonly type: typeof CHANGE_PASSWORD_SUCCESS
}

export interface IChangePasswordFailedAction {
    readonly type: typeof CHANGE_PASSWORD_FAILED
}



export const signUpAction = (): ISignUpAction => ({
    type: SIGN_UP_REQUEST
})

export const signUpSuccessAction = (userData: TSignUpData ): ISignUpSuccessAction => ({
    type: SIGN_UP_SUCCESS,
    userData
})

export const signUpFailedAction = (): ISignUpFailedAction => ({
    type: SIGN_UP_FAILED
})

export const signInAction = (): ISignInAction => ({
    type: SIGN_IN_REQUEST
})

export const signInSuccessAction = (userData: TUserData): ISignInSuccessAction => ({
    type: SIGN_IN_SUCCESS,
    userData
})

export const signInFailedAction = (): ISignInFailedAction => ({
    type: SIGN_IN_FAILED
})

export const getUserAction = (): IGetUserAction => ({
    type: GET_USER_REQUEST
})

export const getUserSuccessAction = (userData: TUserData): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    userData
})

export const getUserFailedAction = (): IGetUserFailedAction => ({
    type: GET_USER_FAILED
})

export const checkAuthAction = () => ({
    type: CHECK_AUTH
})

export const signOutAction = (): ISignOutAction => ({
    type: SIGN_OUT_REQUEST
})

export const signOutSuccessAction = (): ISignOutSuccessAction => ({
    type: SIGN_OUT_SUCCESS,
})

export const signOutFailedAction = (): ISignOutFailedAction => ({
    type: SIGN_OUT_FAILED
})

export const saveNewDataAction = (): ISaveNewDataAction => ({
    type: SAVE_DATA_REQUEST
})

export const saveNewDataSuccessAction = (userData: TUserData): ISaveNewDataSuccessAction => ({
    type: SAVE_DATA_SUCCESS,
    userData
})

export const saveNewDataFailedAction = (): ISaveNewDataFailedAction => ({
    type: SAVE_DATA_FAILED
})

export const resetPasswordAction = (): IResetPasswordAction => ({
    type: RESET_PASSWORD_REQUEST
})

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS
})

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
    type: RESET_PASSWORD_FAILED
})

export const changePasswordAction = (): IChangePasswordAction => ({
    type: CHANGE_PASSWORD_REQUEST
})

export const changePasswordSuccessAction = (): IChangePasswordSuccessAction => ({
    type: CHANGE_PASSWORD_SUCCESS
})

export const changePasswordFailedAction = (): IChangePasswordFailedAction => ({
    type: CHANGE_PASSWORD_FAILED
})



export const signUp = (userData: TSignInData ) => {
    return function(dispatch: AppDispatch) {
        dispatch(signUpAction());
        signUpRequest(userData)
            .then(res => {
                let accessToken, refreshToken
                if (res.success && res) {
                    dispatch(signUpSuccessAction(res.user))
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
                dispatch(signUpFailedAction());
            })
    }
}


export const signIn = (userData: TLoginData) => {
    return function(dispatch: AppDispatch) {
        dispatch(signInAction())
        loginRequest(userData)
            .then(res => {
                let accessToken, refreshToken
                if (res.success && res) {
                    dispatch(signInSuccessAction(res.user))
                    
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
                dispatch(signInFailedAction());
            })
    }
}

export const getUser = () => {
    return function(dispatch: AppDispatch) {
        dispatch(getUserAction())
        fetchWithRefresh(getCookie('accessToken'), getCookie('refreshToken'))
            .then(res => {
                if (res.success && res) {
                    dispatch(getUserSuccessAction(res.user))
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(getUserFailedAction());

                deleteCookie('accessToken')
                deleteCookie('refreshToken')
            })
            .finally(() => {
                dispatch(checkAuthAction()) 
            })
    }
}


export const checkAuth= () => {
    return (dispatch: AppDispatch) => {
        if (getCookie('accessToken')) {
            dispatch(getUser())
        }
        else {
            dispatch(checkAuthAction())
        }
    }
}

export const signOut = () => {
    return (dispatch: AppDispatch) => {
        dispatch(signOutAction())
        signOutRequest(getCookie('refreshToken'))
            .then(res => {
                if (res.success && res) {
                    dispatch(signOutSuccessAction())
                    deleteCookie('accessToken')
                    deleteCookie('refreshToken')
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(signOutFailedAction())
            })
    }
}

export const saveNewData = (userData: TSignInData) => {
    return function(dispatch: AppDispatch) {
        dispatch(saveNewDataAction())
        patchUserDataRequest(userData, getCookie('accessToken'))
            .then(res => {
                if (res.success && res) {
                    dispatch(saveNewDataSuccessAction(res.user))
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(saveNewDataFailedAction());
            })
    }
}

export const resetPassword = (email: { email: string }) => {
    return function(dispatch: AppDispatch) {
        dispatch(resetPasswordAction())
        resetPasswordRequest(email)
            .then (res => {
                if (res.success && res) {
                    dispatch(resetPasswordSuccessAction())
                }
            })
            .catch(err => {
                dispatch(resetPasswordFailedAction())
                console.log(err)
            })
    }
}

export const changePassword= (data: TChangePasswordData) => {
    return function(dispatch: AppDispatch) {
        dispatch(changePasswordAction())
        changePasswordRequest(data)
            .then(res => {
                if (res.success && res) {
                    dispatch(changePasswordSuccessAction())
                }
            })
            .catch(err => {
                dispatch(changePasswordFailedAction())
                console.log(err)
            })
    }
}

export type TUserActions = 
    | ISignUpAction
    | ISignUpSuccessAction
    | ISignUpFailedAction
    | ISignInAction
    | ISignInSuccessAction
    | ISignInFailedAction
    | IGetUserAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | ICheckAuthAction
    | ISignOutAction
    | ISignOutSuccessAction
    | ISignOutFailedAction
    | ISaveNewDataAction
    | ISaveNewDataSuccessAction
    | ISaveNewDataFailedAction
    | IResetPasswordAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | IChangePasswordAction
    | IChangePasswordSuccessAction
    | IChangePasswordFailedAction