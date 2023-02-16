import { generateKeyPair, createHash, createPrivateKey, createSign } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

/**
 * generates the rsa public private key pair
 */
export const generatePublicPrivateKeyPair = () => {
    return new Promise((resolve, reject) => {
        generateKeyPair('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'der'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'der'
            }
        }, (err, publicKey, privateKey) => {
            if(err) {
                reject(err)
            }
            else {
                // writeFileSync('private.pem', privateKey.toString('base64'))
                // writeFileSync('public.pem', publicKey.toString('base64'))
                resolve({
                    publicKey: publicKey.toString('base64'),
                    privateKey: privateKey.toString('base64')
                });
            }
        });
    });
}

/**
 * hashes the supplied info
 * @param data aadhar info needed to be hashed
 */
const hashInfo = (data: any) => {
    return createHash('md5').update(JSON.stringify(data)).digest('hex');
}

/**
 * creates a digital sign of public key, creation date and expiration date
 * @param data public key, creation date and expiration date to be digitally signed
 */
export const signData = (data: any) => {
    // console.log(readFileSync(resolve('private.pem'), {encoding: 'ascii'}))
    const privateKey = createPrivateKey({
        key: Buffer.from(readFileSync(resolve('private.pem'), {encoding: 'ascii'}), 'base64'),
        type: 'pkcs1',
        format: 'der'
    });
    // console.log(JSON.stringify(data))
    const sign = createSign('SHA256')
    sign.update(JSON.stringify(data));
    sign.end();
    return sign.sign(privateKey).toString('base64');
}

/**
 * generates creation date and expiration date info
 * @param validityPeriod validity period of the public key private key pair in number of days
 */
export const genrateExiprationDate = (validityPeriod: number) => {
    const currTime = new Date();
    const expTime = new Date();
    expTime.setDate(currTime.getDate()+validityPeriod);
    return {
        creationTime: currTime,
        expiryTime: expTime
    };
}

/**
 * verifies the data from aadhar server [dummy]
 * @param data aadhar data needed to be sent to aadhar servers
 */
export const AadharVerifier = (data: any) => {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

/**
 * verfies if the aadhar user is already registered
 * @param data aadhar data needed to be check for registration
 */
export const checkAlreadyRegistered = (data: any) => {
    return new Promise((resolve, reject) => {
        const hash = hashInfo(data);
        // console.log(hash);
        resolve(false);
    });
}

/**
 * updates the database with issue of the rsa keys
 * @param data userInfo required to be updated to the database
 */
export const updateRegistrationInfo = (data: any) => {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

/**
 * returns the goverment public key for the validation of the signature
 */
export const returnPublicKey = () => {
    return readFileSync(resolve('private.pem'), {encoding: 'ascii'});
}