import { registerUser } from '../../utils/api-requests';
import { setCookie } from '../../utils/cookies';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function register(userData) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerUser(userData)
      .then(res => {
        console.log(res);
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('token', authToken);
        }
        localStorage.setItem('refreshToken', res.refreshToken);

        if (res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
}
