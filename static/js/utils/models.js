const Models = {
    createUser: (name, dob, gender, address, aadharno) => {
        return {
            name: name,
            dob: dob,
            gender: gender,
            address: address,
            aadharNo: aadharno
        }
    },
    createKeyPair: (publicKey, privateKey) => {
        return {
            publicKey: publicKey,
            privateKey
        }
    },
    createTimePair: (creationTime, expirationTime) => {
        return {
            creationTime: creationTime,
            expirationTime: expirationTime
        }
    }
}
