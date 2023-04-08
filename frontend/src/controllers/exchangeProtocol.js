import { session } from './session';
import { RSAVerifyData } from '../helpers/rsa/rsaVerification';
import { getPublicKey } from '../helpers/apiCalls';
import { base64ToArrayBuffer } from '../helpers/base64Formatter';
import { importRSAPSSJWK } from '../helpers/rsa/rsaManageKeys';

export const sendProtocol = {
    internal: {
        variables: {
            step: 0,
            publicKey: '',
            rawData: '',
            encPub: '',
            publicSignKey: ''
        },
        functions: {

        }
    },
    init: () => {
        return new Promise((resolve, reject) => {
            sendProtocol.internal.variables.step=0;
            sendProtocol.internal.variables.publicKey=session.getPubKey();
            const data = {
                cred: session.getPubCreds(),
                profile: session.getSecretProfile()
            }
            sendProtocol.internal.variables.rawData=JSON.stringify(data)
            getPublicKey().then(publicSignKey => {
                sendProtocol.internal.variables.publicSignKey = publicSignKey;
                console.log(sendProtocol.internal.variables.publicSignKey);
                resolve();
            })
            .catch(err => {
                reject()
            });
        })
    },
    getData: (data) => {
        const {publicKey, timePair, sign} = data;
        //verify data using sign
        console.log(JSON.stringify({publicKey, timePair}));
        // const parsedSign = base64ToArrayBuffer(sign);
        const parsedSign = sign;
        console.log(parsedSign);
        console.log(sendProtocol.internal.variables.publicSignKey);
        importRSAPSSJWK(sendProtocol.internal.variables.publicSignKey).then(publicSignKey => {
            console.log(publicSignKey);
            const verifyStatus = RSAVerifyData(publicSignKey, parsedSign, JSON.stringify({publicKey, timePair}));
            console.log(verifyStatus);
        })
        //store public key
        //create data log record
    }
}