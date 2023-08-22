export default {
    // API URLS

    API_URL_LOGIN: '/login',

    API_URL_LOGOUT: '/logout',

    async login(app, params) {

        return new Promise(resolve => {

            app.apiService
                .callApiPost(
                this.API_URL_LOGIN,
                params)
                .then((apiResponse) => {
                    let dataObj = {
                        isSucceeded: null,
                        data: {
                            token: null
                        },
                        errors: null
                    }

                    if (apiResponse.errors) {
                        dataObj.isSucceeded = false;
                        dataObj.errors = apiResponse.errors;
                    } else {
                        dataObj.isSucceeded = true;

                        dataObj.data.token = apiResponse.token;
                    }

                    resolve(dataObj);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(null);
                })
        })
    },

    async logout(app, params) {

        return new Promise(resolve => {

            app.apiService
                .callApiPost(
                    this.API_URL_LOGOUT,
                    params)
                .then((apiResponse) => {
                    let dataObj = {
                        isSucceeded: null,
                        data: {
                            token: null
                        },
                        errors: null
                    }

                    if (apiResponse.errors) {
                        dataObj.isSucceeded = false;
                        dataObj.errors = apiResponse.errors;
                    } else {
                        dataObj.isSucceeded = true;

                        // dataObj.data.token = apiResponse.token;
                    }

                    resolve(dataObj);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(null);
                })
        })
    }
}