import { IKeyPair } from "./keyPair"
import { ITimePair } from "./timePair"

export interface IRegisterData {
    keyPair: IKeyPair,
    timePair: ITimePair,
    sign: Array<any>,
    dataHash: string
}

export interface IRequestRefreshData {
    requestID: string,
    encryptedSecret: string
}

export interface IIssueRequestData { 
    sign: Array<any>,
    timePair: ITimePair
}