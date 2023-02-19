export const registerBodyValidator = (body: any) => {
    if(
        body.name === undefined ||
        body.dob === undefined ||
        body.gender === undefined ||
        body.address === undefined ||
        body.aadharNo === undefined
    ) {
        return false;
    }
    else {
        return true;
    }
}

export const requestRefreshValidator = (body: any) => {
    if(
        body.dataHash === undefined
    ) {
        return false;
    }
    else {
        return true;
    }
}

export const issueRefreshValidator = (body: any) => {
    if(
        body.dataHash === undefined ||
        body.decString === undefined ||
        body.requestID === undefined
    ) {
        return false;
    }
    else {
        return true;
    }
}