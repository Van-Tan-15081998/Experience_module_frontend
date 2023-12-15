// import { useAuthStore } from '@/store/System/AuthStore';

export default {
    // API URLS
    API_URL_LIST: '/master/knowledge_article_master/tag/list',
    API_URL_DETAIL: '/master/knowledge_article_master/tag/detail',
    API_URL_DETAIL_REGISTER: '/master/knowledge_article_master/tag/detail/register',
    API_URL_DETAIL_UPDATE: '/master/knowledge_article_master/tag/detail/update',
    API_URL_DETAIL_DELETE: '/master/knowledge_article_master/tag/detail/delete',

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
    },

    async getDetailData(app, urlParams, params) {
        return new Promise(resolve => {

            app.apiService
                .callApiGet(
                    this.API_URL_DETAIL + urlParams,
                    params)
                .then((apiResponse) => {
                    let dataObj = {
                        isSucceeded: null,
                        role: null,
                        data: null,
                        alerts: null
                    }

                    if (apiResponse.errors) {
                        dataObj.isSucceeded = false;
                        dataObj.alerts = apiResponse.errors;
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
    },

    async save(app, isRegister, params) {

        return new Promise(resolve => {
            let url = isRegister ? this.API_URL_DETAIL_REGISTER : this.API_URL_DETAIL_UPDATE;

            app.apiService
                .callApiPost(
                    url,
                    params)
                .then((apiResponse) => {
                    console.log(url)
                    let dataObj = {
                        isSucceeded: null,
                        inputErrors: [],
                        data: null,
                        alerts: null
                    }

                    if (apiResponse.errors) {
                        dataObj.isSucceeded = false;
                        dataObj.alerts = apiResponse.errors;
                    } else {
                        if (apiResponse.contents.errors) {

                            dataObj.isSucceeded = false
                            dataObj.inputErrors = apiResponse.contents.errors;
                        } else {

                            dataObj.isSucceeded = true
                            dataObj.data = apiResponse.contents.data;

                            if (apiResponse.contents.statuses) {

                                dataObj.alerts = apiResponse.contents.statuses
                            }
                        }
                    }
                    console.log(dataObj)

                    resolve(dataObj);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(null);
                });
        });
    },

    async delete(app, params) {

        return new Promise(resolve => {

            app.apiService
                .callApiPost(
                    this.API_URL_DETAIL_DELETE,
                    params)
                .then((apiResponse) => {
                    let dataObj = {
                        isSucceeded: null,
                        inputErrors: [],
                        data: null,
                        alerts: null
                    }

                    if (apiResponse.errors) {
                        dataObj.isSucceeded = false;
                        dataObj.alerts = apiResponse.errors;
                    } else {
                        if (apiResponse.contents.errors) {

                            dataObj.isSucceeded = false
                            dataObj.inputErrors = apiResponse.contents.errors;
                        } else {

                            dataObj.isSucceeded = true
                            dataObj.data = apiResponse.contents.data;

                            if (apiResponse.contents.statuses) {

                                dataObj.alerts = apiResponse.contents.statuses
                            }
                        }
                    }
                    console.log(dataObj)

                    resolve(dataObj);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(null);
                });
        });
    }
}