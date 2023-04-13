// import { useAuthStore } from '@/store/System/AuthStore';

export default {
    // API URLS
    API_URL_LIST: '/master/favorite_app/book/list',

    async getList(app, urlParams, params) {

        return new Promise(resolve => {

            app.apiService
                .callApiGet(
                    this.API_URL_LIST + urlParams,
                    params)
                .then((apiResponse) => {
                    let dataObj = {
                        isSucceeded: null,
                        role: null,
                        data: null,
                        errors: null
                    }

                    if (apiResponse.errors) {
                        dataObj.isSucceeded = false;
                        dataObj.errors = apiResponse.errors;
                    } else {
                        dataObj.isSucceeded = true;

                        dataObj.role = apiResponse.contents.role;

                        if (apiResponse.contents.data && Object.keys(apiResponse.contents.data).length) {
                            dataObj.data = apiResponse.contents.data;
                        }

                        if (apiResponse.contents.statuses) {
                            dataObj.alerts = apiResponse.contents.statuses;
                        }
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