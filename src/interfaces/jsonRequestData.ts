import {Request} from 'express';

export interface IRegisterRequest extends Request {
    body: {
        name: string,
        dob: string,
        gender: string,
        address: string,
        aadharNo: string
    }
}

export interface IRequestRefreshRequest extends Request {
    body: {
        dataHash: string
    }
}

export interface IIssueRefreshRequest extends Request {
    body: {
        dataHash: string, 
        decryptedString: string,
        requestID: string
    }
}
