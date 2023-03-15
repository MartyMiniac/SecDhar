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
