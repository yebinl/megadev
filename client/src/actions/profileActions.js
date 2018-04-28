import axios from 'axios';

import {GET_PROFILE,
        PROFILE_LOADING,
        CLEAR_CURRENT_PROFILE,
        GET_ERRORS,
        SET_CURRENT_USER,
        GET_PROFILES
      } from './type';

//get current PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profiles')
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
      })).catch(error => dispatch({
        type: GET_PROFILE,
        payload: {}
      }));
};


// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profiles', profileData)
    .then(res => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

//get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profiles/all')
      .then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data
      })).catch(error => dispatch({
        type: GET_PROFILES,
        payload: null
      }));
};

//delete account
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? Because delete account CANNOT be undone!')) {
    axios.delete('/api/profiles')
        .then(res => dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })).catch(error => dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        }));
  }
};

//add experience
export const addExperience = (expData, history) => dispatch => {
  axios.post('/api/profiles/experience', expData)
      .then(res => history.push('/dashboard'))
      .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      }));
};

//add education
export const addEducation = (eduData, history) => dispatch => {
  axios.post('/api/profiles/education', eduData)
      .then(res => history.push('/dashboard'))
      .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      }));
};

//delete experience
export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profiles/experience/${id}`)
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
      })).catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      }));
};

//delete education
export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profiles/education/${id}`)
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
      })).catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      }));
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profiles/handle/${handle}`)
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
      })).catch(error => dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//get profile by id
export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profiles/user/${id}`)
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
      })).catch(error => dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};

//clear profile
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
};
