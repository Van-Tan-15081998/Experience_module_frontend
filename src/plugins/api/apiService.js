// import axios
import axios from 'axios'

import ApiConstants from "./apiConstants";
class ApiService {

    authHeader() {
        let user = JSON.parse(localStorage.getItem('user'));
        let headers = {
            Accept: 'application/json'
        };

        if (user && user.token) {
            headers.Authorization = 'Bearer ' + user.token;
        }

        return headers;
    }

    callApiGet(api) {
        console.log(ApiConstants.API_ROOT_URL + api)
        return axios
            .get(ApiConstants.API_ROOT_URL + api, {
                // headers: this.authHeader()
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    }

    callApiPost(api, data) {
        return axios
            .post(ApiConstants.API_ROOT_URL + api, data, {
                headers: this.authHeader()
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    }

    callApiPut(api, data) {
        return axios
            .put(ApiConstants.API_ROOT_URL + api, data, {
                headers: this.authHeader()
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default new ApiService();
