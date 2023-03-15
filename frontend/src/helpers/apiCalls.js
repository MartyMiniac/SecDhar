import { Request } from "./requests"

const pathPrefix='/api'
const pathPostfix=''

const paths = {
    register: pathPrefix+'/user/register'+pathPostfix,
    requestRefresh: pathPrefix+'/user/requestRefresh'+pathPostfix,
    issueRefresh: pathPrefix+'/user/issueRefresh'+pathPostfix,
}

export const register = (data) => {
    return new Promise(async (resolve, reject) => {
        const requestBody = await Request.post(paths.register, data)
        if(requestBody.success===true) {
            resolve(requestBody.data)
        }
        else {
            reject(requestBody.msg)
        }
    })
}

export const requestRefresh = (data) => {
    return new Promise((resolve, reject) => {
        resolve(Request.post(paths.requestRefresh, data))
    })
}

export const issueRefresh = (data) => {
    return new Promise((resolve, reject) => {
        resolve(Request.post(paths.issueRefresh, data))
    })
}