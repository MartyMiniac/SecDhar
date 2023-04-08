import { webcrypto} from 'crypto'
import { resolve } from 'path';
import { readFileSync } from 'fs';

export const exportRSAJWK = (key: webcrypto.CryptoKey) => {
    return new Promise<webcrypto.JsonWebKey>((resolve, reject) => {
        webcrypto.subtle.exportKey('jwk', key)
        .then(exp => {
            resolve(exp)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const importRSAJWK = (key: any, keyType: any, usage: any) => {
    return new Promise<webcrypto.CryptoKey>((resolve, reject) => {
        webcrypto.subtle.importKey('jwk', key, keyType, false, usage)
        .then(key => {
            resolve(key)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const importRSAPSSJWTFile = async (path: string) => {
    const keys: any = JSON.parse(readFileSync(resolve(path), {encoding: 'utf-8'}));
    const publicKey: webcrypto.CryptoKey = await importRSAJWK(keys.publicKey, {
        name: 'RSA-PSS',
        hash: {name: 'SHA-256'}
    }, ['verify']);
    const privateKey: webcrypto.CryptoKey = await importRSAJWK(keys.privateKey, {
        name: 'RSA-PSS',
        hash: {name: 'SHA-256'}
    }, ['sign']);

    const parsedKeys: webcrypto.CryptoKeyPair = {
        publicKey: publicKey,
        privateKey: privateKey
    };

    return parsedKeys;
}