// Package imports
import Axios from "axios";

// Constants import
import constants from "../app.constants";

const signInUser = async(formData: any) => {
  return Axios({
    method: "POST",
    data: { ...formData },
    withCredentials: true,
    url: constants.apiUrl + constants.auth + "/local-login",
  })
    .then(async (resp: any) => {
      return resp.data;
    })
    .catch(async (resp: any) => {
      return resp.response.data;
    });
};

const signUpUser = async(formData: any) => {
  return Axios({
    method: "POST",
    data: { ...formData },
    withCredentials: true,
    url: constants.apiUrl + constants.auth + "/local-signup",
  })
    .then(async (resp: any) => {
      return resp.data;
    })
    .catch(async (resp: any) => {
      return resp.response.data;
    });
};

const forgotPassword = async(formData: any) => {
  return Axios({
    method: "POST",
    data: { ...formData },
    withCredentials: true,
    url: "http://localhost:4000/api/auth/local-forgotpassword",
  })
    .then(async (resp: any) => {
      return resp.data;
    })
    .catch(async (resp: any) => {
      return resp.response.data;
    });
}

const updateUserData = async(userFormData: any) => {
  return Axios({
    method: "PUT",
    data: { ...userFormData },
    withCredentials: true,
    url: "http://localhost:4000/api/auth/update-profile",
  })
    .then(async (resp: any) => {
      return resp.data;
    })
    .catch(async (resp: any) => {
      return resp.response.data;
    });
};

const changePassword = async(passwordformData: any) => {
  return Axios({
    method: "PUT",
    data: { ...passwordformData },
    withCredentials: true,
    url: "http://localhost:4000/api/auth/local-changepassword",
  })
    .then(async (resp: any) => {
      return resp.data;
    })
    .catch(async (resp: any) => {
      return resp.response.data;
    });
}

const logoutUser = async() => {
  return Axios.get('http://localhost:4000/api/auth/logout', {
    withCredentials: true,
    headers:{
      Accept: '*/*',
     'Content-Type': 'application/json',
  }
  })
    .then(async (resp: any) => {
      return resp.data;
    })
    .catch(async (resp: any) => {
      return resp.response.data;
    });
};

export { signInUser, signUpUser, forgotPassword, updateUserData, changePassword, logoutUser };
