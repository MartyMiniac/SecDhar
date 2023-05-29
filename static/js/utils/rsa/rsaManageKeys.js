const RsaManageKeys = {
    importRSAJWK: (key, keyType, usage) => {
        return new Promise((resolve, reject) => {
            window.crypto.subtle.importKey('jwk', key, keyType, false, usage)
            .then(key => {
                resolve(key)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    
    importRSAPSSJWK: async (rawKeyPair) => {
        const publicKey = await RsaManageKeys.importRSAJWK(rawKeyPair.publicKey, {
            name: 'RSA-PSS',
            hash: {name: 'SHA-256'}
        }, ['verify']);
    
        return publicKey;
    },
    
    importRSAOAEPJWKPublicKey: async (rawKey) => {
        const publicKey = await importRSAJWK(rawKey, {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
        }, ['encrypt']);
    
        return publicKey;
    },
    
    importRSAOAEPJWKPrivateKey: async (rawKey) => {
        const privateKey = await importRSAJWK(rawKey, {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
        }, ['decrypt']);
    
        return privateKey;
    }
}