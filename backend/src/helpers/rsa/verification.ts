import { webcrypto} from 'crypto'

export const generateKeyPairForSign = () => {
    return new Promise((resolve, reject) => {
        webcrypto.subtle.generateKey({
            name: 'RSA-PSS',
            modulusLength: 1024,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256'
        }, true, ['sign', 'verify'])
        .then(kp => {
            resolve(kp);
        })
        .catch(err => {
            reject(err);
        })
    });
}
export const RSASignData = (privateKey: webcrypto.CryptoKey, data: string): Promise<Array<any>> => {
    return new Promise((resolve, reject) => {
        const encodedData = new TextEncoder().encode(data);
        webcrypto.subtle.sign({
            name: 'RSA-PSS',
            saltLength: 32
        }, privateKey, encodedData)
        .then(signedData => {
            // console.log(signedData);
            // console.log(new Uint8Array(signedData));
            resolve(Array.from(new Uint8Array(signedData)));
        })
        .catch(err => {
            reject(err);
        })
    });
}
export const RSAVerifyData = (publicKey: webcrypto.CryptoKey, signature: string, data: string) => {
    return new Promise((resolve, reject) => {
        const encodedSignature = new TextEncoder().encode(signature);
        const encodedData = new TextEncoder().encode(data);

        webcrypto.subtle.verify({
            name: 'RSA-PSS',
            saltLength: 32
        }, publicKey, encodedSignature, encodedData)
        .then(verifiedStatus => {
            resolve(verifiedStatus);
        })
        .catch(err => {
            reject(err);
        })
    });
}