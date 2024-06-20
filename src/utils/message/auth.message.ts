import { INVALID } from "zod";

export default {
    "LOGIN_SUCCESS": {
        message: 'Login successfully!',
        message_code: 'login_success',
    },
    "LOGIN_FAILED": {
        message: 'Login failed!',
        message_code: 'login_failed'
    },
    "LOGOUT_SUCCESS": {
        message: 'Logout successfully!',
        message_code: 'logout_success'
    },
    "LOGOUT_FAILED": {
        message: 'Logout failed!',
        message_code: 'logout_failed'
    },
    "INVALID_LOGIN": {
        message: 'User not found or invalid credentials!',
        message_code: 'invalid_login'
    },
    "SIGN_UP_SUCCESS": {
        message: 'Sign up successfully!',
        message_code: 'sign_up_success'
    },
    "SIGN_UP_FAILED": {
        message: 'Sign up failed!',
        message_code: 'sign_up_failed'
    },
    "EMAIL_EXISTED": {
        message: 'Email existed!',
        message_code: 'email_existed'
    },
    "PHONE_EXISTED": {
        message: 'Phone existed!',
        message_code: 'phone_existed'
    },
    "EMAIL_PHONE_EXISTED": {
        message: 'Email or Phone existed!',
        message_code: 'email_phone_existed'
    },
}