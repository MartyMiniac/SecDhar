import { session } from './session';
import { verify } from '../helpers/rsa';
import { getPublicKey } from '../helpers/apiCalls';

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
        sendProtocol.internal.variables.step=0;
        sendProtocol.internal.variables.publicKey=session.getPubKey();
        const data = {
            cred: session.getPubCreds(),
            profile: session.getSecretProfile()
        }
        sendProtocol.internal.variables.rawData=JSON.stringify(data)
        sendProtocol.internal.variables.publicSignKey = getPublicKey();
    },
    getData: (data) => {
        const {publicKey, timePair, sign} = data;
        //verify data using sign
        console.log(JSON.stringify({publicKey, timePair}));
        const verifyStatus = verify(JSON.stringify({publicKey, timePair}), sign, sendProtocol.internal.variables.publicSignKey);
        console.log(verifyStatus);
        //store public key
        //create data log record
    }
}