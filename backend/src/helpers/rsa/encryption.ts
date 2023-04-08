import { webcrypto} from 'crypto'

export const generateKeyPairForEnc = () => {
    return new Promise<webcrypto.CryptoKeyPair>((resolve, reject) => {
        webcrypto.subtle.generateKey({
            name: 'RSA-OAEP',
            modulusLength: 1024,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256'
        }, true, ['encrypt', 'decrypt'])
        .then(kp => {
            resolve(kp);
        })
        .catch(err => {
            reject(err);
        })
    });
}
export const RSAEncrypt = (publicKey: webcrypto.CryptoKey, msg: string) => {
    return new Promise((resolve, reject) => {
        //encode the message
        const encodedMsg: Uint8Array =  new TextEncoder().encode(msg);

        return webcrypto.subtle.encrypt({
            name: 'RSA-OAEP'
        }, publicKey, encodedMsg)
        .then(cipher => {
            const decodedcipher = new TextDecoder().decode(cipher);
            resolve(decodedcipher);
        })
        .catch(err => {
            reject(err);
        })
    });
}
export const RSADecrypt = (privateKey: webcrypto.CryptoKey, cipherText: string) => {
    return new Promise((resolve, reject) => {
        const encodedCipherText: Uint8Array =  new TextEncoder().encode(cipherText);

        webcrypto.subtle.decrypt({
            name: 'RSA-OAEP'
        }, privateKey, encodedCipherText)
        .then(plainText => {
            const decodedPlainText = new TextDecoder().decode(plainText);
            resolve(decodedPlainText);
        })
        .catch(err => {
            reject(err);
        })
    });
}