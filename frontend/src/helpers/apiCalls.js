import { Request } from './requests';

const env = 'PROD';
const pathPrefix = '/api';
const pathPostfix = '';

const paths = {
    register: pathPrefix + '/user/register' + pathPostfix,
    requestRefresh: pathPrefix + '/user/requestRefresh' + pathPostfix,
    issueRefresh: pathPrefix + '/user/issueRefresh' + pathPostfix,
    getPublicKey: pathPrefix + '/user/getPublicKey' + pathPostfix,
};

export const register = (data) => {
    if (env === 'PROD') {
        return new Promise(async (resolve, reject) => {
            const requestBody = await Request.post(paths.register, data);
            if (requestBody.success === true) {
                resolve(requestBody.data);
            } else {
                reject(requestBody.msg);
            }
        });
    }
};

export const requestRefresh = (data) => {
    return new Promise((resolve, reject) => {
        resolve(Request.post(paths.requestRefresh, data));
    });
};

export const issueRefresh = (data) => {
    return new Promise((resolve, reject) => {
        resolve(Request.post(paths.issueRefresh, data));
    });
};

export const getPublicKey = () => {
    if (env === 'PROD') {
        return new Promise((resolve, reject) => {
            resolve(Request.get(paths.getPublicKey));
        });
    }
};
