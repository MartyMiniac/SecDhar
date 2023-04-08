import { session } from '../controllers/session';
const sc = window.crypto.subtle;

export const encrypt = (msg) => {
    return new Promise((resolve, reject) => {
        //encode the message        
        const encodedMessage = new TextEncoder().encode(msg);

        sc.encrypt({
            name: 'RSA-OAEP'
        }, session.getPubKey(), encodedMessage)
        .then(encrypted => {
            console.log(encrypted);
            resolve(encrypted);
        })
        .catch(err => {
            reject(err);
        })
    });

    // const encrypt = new JSencrypt();
    // encrypt.setPublicKey(session.getPubKey());
    // return encrypt.encrypt(data);
};

// export const decrypt = (data) => {
//     const encrypt = new JSencrypt();
//     encrypt.setPrivateKey(session.getPriKey());
//     return encrypt.decrypt(data);
// };

// export const verify = (data, sign, publicKey) => {
//     const encrypt = new JSencrypt();
//     encrypt.setPublicKey(publicKey);
//     return encrypt.verify(data, sign, 'sha256')
// }