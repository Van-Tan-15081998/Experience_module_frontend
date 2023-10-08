export default {
    API_URL_SEARCH: '/master/knowledge_article_master/master_search',

    async getSearch(app, urlParams, params) {

        return new Promise(resolve => {

            app.apiService
                .callApiGet(
                    this.API_URL_SEARCH + urlParams,
                    params)
                .then((apiResponse) => {
                    let dataObj = {
                        isSucceeded: null,
                        data: null,
                        errors: null
                    }

                    if (apiResponse.errors) {
                        dataObj.isSucceeded = false;
                        dataObj.errors = apiResponse.errors;
                    } else {
                        dataObj.isSucceeded = true;

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
}