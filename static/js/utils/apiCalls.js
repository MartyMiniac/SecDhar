const __pathPrefix = '/api';
const __pathPostfix = '';
const ApiPaths= {
    register: __pathPrefix + '/user/register' + __pathPostfix,
    requestRefresh: __pathPrefix + '/user/requestRefresh' + __pathPostfix,
    issueRefresh: __pathPrefix + '/user/issueRefresh' + __pathPostfix,
    getPublicKey: __pathPrefix + '/user/getPublicKey' + __pathPostfix,
};

const ApiCalls = {
    register: (data) => {
        return new Promise(async (resolve, reject) => {
            const requestBody = await Request.post(ApiPaths.register, data);
            if (requestBody.success === true) {
                resolve(requestBody.data);
            } else {
                reject(requestBody.msg);
            }
        });
    },

    requestRefresh: (data) => {
        return new Promise((resolve, reject) => {
            resolve(Request.post(ApiPaths.requestRefresh, data));
        });
    },

    issueRefresh: (data) => {
        return new Promise((resolve, reject) => {
            resolve(Request.post(ApiPaths.issueRefresh, data));
        });
    },

    getPublicKey: () => {
        return new Promise((resolve, reject) => {
            resolve(Request.get(ApiPaths.getPublicKey));
        });
    }
};
