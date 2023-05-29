if(UserProfile.getName()!=='' && UserProfile.getName()!==null) {
    const verifcationData = JSON.stringify({
        publicKey: Credentials.getPublicKey(),
        timePair: Credentials.getTimePair(),
    });

    ApiCalls.getPublicKey()
    .then(async (data) => {
        const srvPubKey = await RsaManageKeys.importRSAPSSJWK(data);
        RsaVerificaion.RSAVerifyData(srvPubKey, Credentials.getSign(), verifcationData).then(data => {
            console.log(data);
            window.location.href='/home'
        })
    })
}