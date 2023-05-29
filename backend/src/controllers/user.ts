import { generateKeyPair, createHash, createPrivateKey, createSign, createPublicKey, publicEncrypt, constants, webcrypto } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

import { User } from "../models/user";
import { Key } from "../models/key";
import { RefreshRequest } from "../models/refreshRequest";
import { generateRandomString } from "../helpers/random";
import { IKeyPair } from "../interfaces/keyPair";
import { ITimePair } from "../interfaces/timePair";
import { IIssueRequestData, IRegisterData } from "../interfaces/jsonResponseData";
import { IRequestRefresh } from "../interfaces/requestRefresh";
import { IJsonFailure, IJsonSuccess } from "../interfaces/jsonResponse";
import { IIssueRefreshRequest, IRegisterRequest } from "../interfaces/jsonRequestData";
import { generateKeyPairForEnc } from "../helpers/rsa/encryption";
import { exportRSAJWK, importRSAJWK, importRSAPSSJWTFile } from "../helpers/rsa/keysManger";
import { RSASignData } from "../helpers/rsa/verification";
import {RSAEncrypt} from "../helpers/rsa/encryption";

/**
 * generates the rsa public private key pair
 */
export const generatePublicPrivateKeyPair = (): Promise<IKeyPair> => {
    return new Promise<IKeyPair>((resolve, reject) => {
        generateKeyPairForEnc()
        .then(async (kp: webcrypto.CryptoKeyPair) => {
            const expkp:IKeyPair = {
                publicKey: await exportRSAJWK(kp.publicKey),
                privateKey: await exportRSAJWK(kp.privateKey)
            };

            resolve(expkp);
        })
        .catch(err => {
            reject(err);
        })
    });
}

/**
 * hashes the supplied info
 * @param data aadhar info needed to be hashed
 */
export const hashInfo = (data: any): string => {
    return createHash('md5').update(JSON.stringify(data)).digest('hex');
}

/**
 * creates a digital sign of public key, creation date and expiration date
 * @param data public key, creation date and expiration date to be digitally signed
 */
export const signData = async (data: any): Promise<Array<any>> => {
    const keyPair = await importRSAPSSJWTFile('keys.json')
    return RSASignData(keyPair.privateKey, JSON.stringify(data));
}

/**
 * generates creation date and expiration date info
 * @param validityPeriod validity period of the public key private key pair in number of days
 */
export const generateExiprationDate = (validityPeriod: number): ITimePair => {
    const currTime = new Date();
    const expTime = new Date();
    expTime.setDate(currTime.getDate()+validityPeriod);
    const timePair: ITimePair = {
        creationTime: currTime,
        expirationTime: expTime
    };
    return timePair;
}

/**
 * verifies the data from aadhar server [dummy]
 * @param data aadhar data needed to be sent to aadhar servers
 */
export const AadharVerifier = (data: any): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

/**
 * verfies if the aadhar user is already registered
 * @param data aadhar data needed to be check for registration
 */
export const checkAlreadyRegistered = (data: IRegisterRequest['body']): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const hash = hashInfo(data);
        const results = await User.find({
            dataHash: hash
        })
        if(results.length==0) {
            resolve(false);
        }
        else {
            resolve(true)
        }
        // console.log(hash);
    });
}

/**
 * updates the database with issue of the rsa keys
 * @param data userInfo required to be updated to the database
 */
export const updateRegistrationInfo = (data: IRegisterData): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        let usr = new User({
            dataHash: data.dataHash,
            publicKey: JSON.stringify(data.keyPair.publicKey)
        });
        usr = await usr.save()

        const k = new Key({
            publicKey: JSON.stringify(data.keyPair.publicKey),
            creationTime: data.timePair.creationTime,
            expirationTime: data.timePair.expirationTime,
            uid: usr._id
        })
        await k.save()

        resolve(true);
    });
}

/**
 * returns the goverment public key for the validation of the signature
 */
export const returnPublicKey = (): string => {
    const keys = JSON.parse(readFileSync(resolve('keys.json'), {encoding: 'utf-8'}));
    return keys.publicKey
}

export const requestRefresh = (hash: string): Promise<IRequestRefresh> => {
    return new Promise(async (resolve, reject) => {
        //check if the user exists
        const usr = await User.findOne({
            dataHash: hash
        });
        //if user doesnt exists the return a failed attempt
        if(usr===null) {
            resolve({
                success: false,
                encryptedSecret: '',
                requestID: ''
            });
        }
        //if user exists then continue
        else {
            // generating a random string
            const secret = generateRandomString(20);
            // creating a new refresh request object for verification later on
            let rqst = new RefreshRequest({
                uid: usr._id,
                secret: secret
            });
            rqst = await rqst.save();
            console.log(usr);
            //parsing the public key of the user
            const publicKey = await importRSAJWK(JSON.parse(usr.publicKey), {
                name: 'RSA-OAEP',
                hash: 'SHA-256'
            }, ['encrypt']);

            //encrypting the genrated secret
            RSAEncrypt(publicKey, secret).then(encSecret => {
                console.log(encSecret)
                resolve({
                    success: true,
                    encryptedSecret: Buffer.from(encSecret).toString('base64'),
                    requestID: rqst._id.toString()
                })
            })
        }
    })
}

const updateExpiry = (uid: string): Promise<IIssueRequestData> => {
    return new Promise(async (resolve, reject) => {
        const k = await Key.findOne({
            uid: uid
        })
        const timePair = generateExiprationDate(3);
        const nk = new Key({
            publicKey: k?.publicKey,
            creationTime: timePair.creationTime,
            expirationTime: timePair.expirationTime,
            uid: k?.uid
        })
        await k?.remove();
        await nk.save()
        resolve({sign: await signData({publicKey: k?.publicKey, time: timePair}), timePair: timePair})
    })
}

export const issueRefresh = (body: IIssueRefreshRequest['body']): Promise<IJsonFailure | IJsonSuccess<IIssueRequestData>> => {
    return new Promise(async (resolve, reject) => {
        const req = await RefreshRequest.findByIdAndUpdate(body.requestID, {
            expired: true
        });
        if(req===null) {
            resolve({
                success: false,
                message: 'requestID not found',
                errorCode: 401
            })
        }
        if(req?.expired===true) {
            resolve({
                success: false,
                message: 'request expired please issue a new request',
                errorCode: 402
            })
        }

        const usr = await User.findOne({
            dataHash: body.dataHash
        });
        if(usr===null) {
            resolve({
                success: false,
                message: 'user not found',
                errorCode: 403
            })
        }

        if(req?.uid !== usr?._id.toString()) {
            resolve({
                success: false,
                message: 'user not linked to the request id',
                errorCode: 404
            })
        }

        if(req?.secret===body.decryptedString) {
            resolve({
                success: true,
                data: await updateExpiry(req?.uid || '')
            })
        }
        else {
            resolve({
                success: false,
                message: 'incorrect secret',
                errorCode: 405
            })
        }
    })
}