const rsaEncryption = {
    RSAEncrypt: (publicKey, msg) => {
        return new Promise((resolve, reject) => {
            //encode the message
            const encodedMsg =  new TextEncoder().encode(msg);
            // console.log(publicKey, msg)
            window.crypto.subtle.encrypt({
                name: 'RSA-OAEP'
            }, publicKey, encodedMsg)
            .then(cipher => {
                cipher = new Uint8Array(cipher);
                const decodedcipher = btoa(Array(cipher.length).fill('').map((_, i) => String.fromCharCode(cipher[i])).join(''));
                // const decodedcipher = new TextDecoder().decode(cipher);
                resolve(decodedcipher);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        });
    },
    RSADecrypt: (privateKey, cipherText) => {
        return new Promise((resolve, reject) => {
            // const encodedCipherText =  new TextEncoder().encode(cipherText);
            const encodedCipherText =  Uint8Array.from(atob(cipherText), (c) => c.charCodeAt(0));
    
            window.crypto.subtle.decrypt({
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
}