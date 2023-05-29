import { IIssueRefreshRequest, IRegisterRequest, IRequestRefreshRequest } from "../interfaces/jsonRequestData";

export const registerBodyValidator = (body: IRegisterRequest['body']) => {
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

export const requestRefreshValidator = (body: IRequestRefreshRequest['body']) => {
    if(
        body.dataHash === undefined
    ) {
        return false;
    }
    else {
        return true;
    }
}

export const issueRefreshValidator = (body: IIssueRefreshRequest['body']) => {
    if(
        body.dataHash === undefined ||
        body.decryptedString === undefined ||
        body.requestID === undefined
    ) {
        return false;
    }
    else {
        return true;
    }
}