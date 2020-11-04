import { AuthActionTypes } from './auth.types';

const INITIAL_STATE = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    }

    case AuthActionTypes.REGISTER_SUCCESS: {
      localStorage.setItem('accessToken', action.payload.accessToken);
      return {
        ...state,
        token: action.payload.accessToken,
        isAuthenticated: true,
        loading: false,
      };
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      localStorage.setItem('token', action.payload.accessToken);
      return {
        ...state,
        token: action.payload.accessToken,
        isAuthenticated: true,
        loading: false,
      };
    }

    case AuthActionTypes.AUTH_ERROR: {
      localStorage.removeItem('token');
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    }

    case AuthActionTypes.REGISTER_FAIL: {
      localStorage.removeItem('accessToken');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    }

    case AuthActionTypes.LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    }

    case AuthActionTypes.LOGIN_FAIL: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
