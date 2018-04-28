import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './type';

//Register user
export const registeruser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(error => dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        }));
}

export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
      .then(res => {
        //save to localstorage
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        //set token to Auth header
        setAuthToken(token);
        //decode token to get user data
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      }));
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//log user out
export const logoutUser = () => dispatch => {
  //remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future req
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
