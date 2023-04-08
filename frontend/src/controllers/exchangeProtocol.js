import { session } from './session';
import { RSAVerifyData } from '../helpers/rsa/rsaVerification';
import { getPublicKey } from '../helpers/apiCalls';
import {
    importRSAOAEPJWKPublicKey,
    importRSAPSSJWK,
} from '../helpers/rsa/rsaManageKeys';

export const sendProtocol = {
    internal: {
        variables: {
            step: 0,
            publicKey: '',
            rawData: '',
            encPub: '',
            publicSignKey: '',
        },
        functions: {},
    },
    init: () => {
        return new Promise((resolve, reject) => {
            sendProtocol.internal.variables.step = 0;
            sendProtocol.internal.variables.publicKey = session.getPubKey();
            const data = {
                cred: session.getPubCreds(),
                profile: session.getSecretProfile(),
            };
            sendProtocol.internal.variables.rawData = JSON.stringify(data);
            getPublicKey()
                .then((publicSignKey) => {
                    sendProtocol.internal.variables.publicSignKey =
                        publicSignKey;
                    console.log(sendProtocol.internal.variables.publicSignKey);
                    resolve();
                })
                .catch((err) => {
                    reject();
                });
        });
    },
    getData: (data) => {
        return new Promise(async (resolve, reject) => {
            const progressCheckList = {
				publicKeyParsingSuccess: false,
                expirationDateVerification: false,
                signatureVerification: false
            };

            const { publicKey, timePair, sign } = data;
			//Parse the public key
			let parsedPublicKey=null;
			try {
				parsedPublicKey = await importRSAOAEPJWKPublicKey(publicKey);
				progressCheckList.publicKeyParsingSuccess=true;
			}
			catch(err) {
				console.log(err);
			}

            //Verify creation date, time and expiration date, time with respect to current date, time
			const currentTime = new Date();
			const creTime = new Date(timePair.creationTime);
			const expTime = new Date(timePair.expirationTime);

			if(progressCheckList.publicKeyParsingSuccess===true && (creTime.getTime()<=currentTime.getTime() && currentTime.getTime()<=expTime.getTime())) {
				progressCheckList.expirationDateVerification=true;
			}
			else {
				//implement failure handling
			}

            //verify data using sign
			if(progressCheckList.expirationDateVerification===true && progressCheckList.publicKeyParsingSuccess===true) {
				const parsedPublicSignKey = await importRSAPSSJWK(
					sendProtocol.internal.variables.publicSignKey
				);
				const verifyStatus = await RSAVerifyData(
					parsedPublicSignKey,
					sign,
					JSON.stringify({ publicKey, timePair })
				);
	
				//store public key
				if (verifyStatus === true) {
					progressCheckList.signatureVerification = true;
				}
			}

			console.log(progressCheckList);
			if(progressCheckList.publicKeyParsingSuccess===true && progressCheckList.expirationDateVerification===true && progressCheckList.signatureVerification===true) {
				resolve({
					success: true,
					status: progressCheckList
				})
			}
			else {
				resolve({
					success: false,
					status: progressCheckList
				})
			}
            //create data log record
        });
    },
};
