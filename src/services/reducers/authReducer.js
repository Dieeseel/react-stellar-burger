import { 
    SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILED,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,   
    CHECK_AUTH,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILED,
    SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED,
    SAVE_DATA_REQUEST, SAVE_DATA_SUCCESS, SAVE_DATA_FAILED,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED

} from "../actions/auth";

const initialState = {
    userData: null,

    registerRequest: false,
    registerRequestFailed: false,

    loginRequest: false,
    loginRequestFailed: false,

    authRequest: false,
    authRequestFailed: false,
    isCheckedAuth: false,

    logoutRequest: false,
    logoutRequestFailed: false,

    resetPasswordRequest: false,
    resetPasswordRequestFailed: false,
    isEmailValid: false,

    changePasswordRequest: false,
    changePasswordRequestFailed: false
}


export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                registerRequest: true
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                userData: action.userData,
                registerRequest: false
            }
        }
        case SIGN_UP_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerRequestFailed: true
            }
        }
        case SIGN_IN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            }
        }
        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                userData: action.userData,
                loginRequest: false
            }
        }
        case SIGN_IN_FAILED: {
            return {
                ...state,
                loginRequestFailed: true,
                loginRequest: false
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                authRequest: true
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                userData: action.userData,
                authRequest: false,
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                authRequest: false,
                authRequestFailed: true,
            }
        }
        case CHECK_AUTH: {
            return {
                ...state,
                isCheckedAuth: true
            }
        }
        case SIGN_OUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            }
        }
        case SIGN_OUT_SUCCESS: {
            return {
                ...state,
                userData: null,
                logoutRequest: false
            }
        }
        case SIGN_OUT_FAILED: {
            return {
                ...state,
                logoutRequestFailed: true
            }
        }
        case SAVE_DATA_REQUEST: {
            return {
                ...state,
                userDataRequest: true
            }
        }
        case SAVE_DATA_SUCCESS: {
            return {
                ...state,
                userData: action.userData,
                userDataRequest: false
            }
        }
        case SAVE_DATA_FAILED: {
            return {
                ...state,
                userDataFailed: true,
                userDataRequest: false
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                isEmailValid: true
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequestFailed: true
            }
        }
        case CHANGE_PASSWORD_REQUEST: {
            return {
                ...state,
                changePasswordRequest: true
            }
        }
        case CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                isEmailValid: false,
                changePasswordRequest: false
            }
        }
        case CHANGE_PASSWORD_FAILED: {
            return {
                ...state,
                changePasswordRequest: false,
                changePasswordRequestFailed: true
            }
        }
        default: {
            return state
        }
    }
}