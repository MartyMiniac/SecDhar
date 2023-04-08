const sc = window.crypto.subtle;

export const RSAEncrypt = (publicKey, msg) => {
    return new Promise((resolve, reject) => {
        //encode the message
        const encodedMsg =  new TextEncoder().encode(msg);

        return sc.encrypt({
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
export const RSADecrypt = (privateKey, cipherText) => {
    return new Promise((resolve, reject) => {
        const encodedCipherText =  new TextEncoder().encode(cipherText);

        sc.decrypt({
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