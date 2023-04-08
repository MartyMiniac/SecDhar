const sc = window.crypto.subtle;

export const importRSAJWK = (key, keyType, usage) => {
    return new Promise((resolve, reject) => {
        sc.importKey('jwk', key, keyType, false, usage)
        .then(key => {
            resolve(key)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const importRSAPSSJWK = async (rawKeyPair) => {
    const publicKey = await importRSAJWK(rawKeyPair.publicKey, {
        name: 'RSA-PSS',
        hash: {name: 'SHA-256'}
    }, ['verify']);

    return publicKey;
}

export const importRSAOAEPJWKPublicKey = async (rawKey) => {
    const publicKey = await importRSAJWK(rawKey, {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
    }, ['encrypt']);

    return publicKey;
}

export const importRSAOAEPJWKPrivateKey = async (rawKey) => {
    const privateKey = await importRSAJWK(rawKey, {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
    }, ['decrypt']);

    return privateKey;
}