import JSencrypt from 'jsencrypt';
import { session } from '../controllers/session';

export const encrypt = (data) => {
    const encrypt = new JSencrypt();
    encrypt.setPublicKey(session.getPubKey());
    return encrypt.encrypt(data);
};

export const decrypt = (data) => {
    const encrypt = new JSencrypt();
    encrypt.setPrivateKey(session.getPriKey());
    return encrypt.decrypt(data);
};

export const verify = (data, sign, publicKey) => {
    const encrypt = new JSencrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.verify(data, sign, 'sha256')
}