import {generateRandomString} from '../helpers/random'
import { session } from './session';

export const sendProtocol = {
    internal: {
        variables: {
            step: 0,
            rndStr: '',
            publicKey: ''
        },
        functions: {

        }
    },
    init: () => {
        sendProtocol.internal.variables.step=0;
        sendProtocol.internal.variables.rndStr=generateRandomString(15);
        const creds = session.getCreds;
        sendProtocol.internal.variables.publicKey=creds.keyPair.publicKey;
        sendProtocol.internal.variables.timePair=creds.timePair;
        sendProtocol.internal.variables.sign=creds.sign;
    }
}