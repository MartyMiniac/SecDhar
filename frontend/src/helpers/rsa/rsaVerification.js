const sc = window.crypto.subtle;

export const RSAVerifyData = (publicKey, signature, data) => {
    return new Promise((resolve, reject) => {
        const encodedSignature = new Uint8Array(signature).buffer;
        const encodedData = new TextEncoder().encode(data);

        sc.verify({
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