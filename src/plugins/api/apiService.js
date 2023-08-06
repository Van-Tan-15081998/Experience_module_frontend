// import axios
import axios from 'axios'

import ApiConstants from "./apiConstants";

export default function (app, store) {
    return new ApiService(app, store);
}

class ApiService {

    constructor(app, store) {
        this.app = app;
        this.store = store;
    }

    authHeader() {

        let headers = {
            Accept: 'application/json'
        };

        if (this.store && this.store.checkLogin()) {
            headers.Authorization = 'Bearer ' + this.store.checkLogin();
        }

        return headers;
    }

    callApiGet(api) {
        return axios
            .get(ApiConstants.API_ROOT_URL + api, {
                headers: this.authHeader()
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {

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
                // Cần return error data tại đây nhằm đảm bảo error trả về (response) đã được handel
                return err.response.data;
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
