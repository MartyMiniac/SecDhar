const sendProtocol = {
    step1 : (data) => {
        return new Promise(async (resolve, reject) => {
            data = JSON.parse(data);
            const finalData = JSON.stringify({
                publicKey: {
                    key_ops: [
                        "encrypt"
                    ],
                    ext: true,
                    kty: "RSA",
                    n: data.n,
                    e: "AQAB",
                    alg: "RSA-OAEP-256"
                },
                timePair: {
                    creationTime: data.ct,
                    expirationTime: data.et
                }
            })
            const sign = Uint8Array.from(atob(data.s), (c) => c.charCodeAt(0));
            const svrPublicKey = await ApiCalls.getPublicKey();
            const parsedSvrPublicKey = await RsaManageKeys.importRSAPSSJWK(svrPublicKey);
            const parsedRcvrPublicKey = await RsaManageKeys.importRSAOAEPJWKPublicKey(JSON.parse(finalData).publicKey);
            // console.log(JSON.stringify(JSON.parse(finalData).publicKey));
            const verifiedStatus = await RsaVerificaion.RSAVerifyData(parsedSvrPublicKey, sign, finalData);
            resolve({
                verifiedStatus: verifiedStatus,
                rcvrPublicKey: parsedRcvrPublicKey
            });
        })
    },
    step2 : (data) => {
        return new Promise(async (resolve, reject) => {
            const userProfile = JSON.stringify(Models.createUser(UserProfile.getName(), UserProfile.getDob(), UserProfile.getGender(), UserProfile.getAddress(), UserProfile.getAadharNumber()));
            const cipherAadharInfo = [];

            //block encryption
            const blockSize = 62;
            for(let i=0; i<=(userProfile.length/blockSize); i++) {
                const slice = userProfile.substring(i*blockSize, Math.min((i+1)*blockSize), userProfile.length);
                // console.log(slice)
                cipherAadharInfo.push(await rsaEncryption.RSAEncrypt(data.rcvrPublicKey, slice));
            }

            const {n} = Credentials.getPrivateKey();
            const {creationTime, expirationTime} = Credentials.getTimePair();
            const sign = (() => {
                const sn = Credentials.getSign();
                return btoa(Array(sn.length).fill('').map((_, i) => String.fromCharCode(sn[i])).join(''));
            })();

            const finalReturnValue = JSON.stringify({
                n: n,
                ct: creationTime,
                et: expirationTime,
                s: sign,
                ai: cipherAadharInfo
            });

            resolve(finalReturnValue);
        })
    }
};

const receiveProtocol = {
    step1 : () => {
        const {n} = Credentials.getPrivateKey();
        const {creationTime, expirationTime} = Credentials.getTimePair();
        const sign = (() => {
            const sn = Credentials.getSign();
            return btoa(Array(sn.length).fill('').map((_, i) => String.fromCharCode(sn[i])).join(''));
        })();

        return JSON.stringify({
            n: n,
            ct: creationTime,
            et: expirationTime,
            s: sign
        })
    },
    step2 : (rawValue) => {
        return new Promise(async (resolve, reject) => {
            data = JSON.parse(rawValue);
            const finalData = JSON.stringify({
                publicKey: {
                    key_ops: [
                        "encrypt"
                    ],
                    ext: true,
                    kty: "RSA",
                    n: data.n,
                    e: "AQAB",
                    alg: "RSA-OAEP-256"
                },
                timePair: {
                    creationTime: data.ct,
                    expirationTime: data.et
                }
            })
            const sign = Uint8Array.from(atob(data.s), (c) => c.charCodeAt(0));
            const svrPublicKey = await ApiCalls.getPublicKey();
            const parsedSvrPublicKey = await RsaManageKeys.importRSAPSSJWK(svrPublicKey);
            const verifiedStatus = await RsaVerificaion.RSAVerifyData(parsedSvrPublicKey, sign, finalData);

            if(verifiedStatus===true) {
                const parsedRcvrPrivateKey = await RsaManageKeys.importRSAOAEPJWKPrivateKey(Credentials.getPrivateKey());
                
                //block deciphering
                let plainText = '';
                for(i in data.ai) {
                    plainText += await rsaEncryption.RSADecrypt(parsedRcvrPrivateKey, data.ai[i]);
                }
                
                const aadharInfo = JSON.parse(plainText);
                resolve({
                    success: true,
                    data: aadharInfo
                })
            }
            else {
                resolve({
                    success: false
                })
            }
        })
    },
}