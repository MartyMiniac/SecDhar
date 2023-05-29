//user profile info
const UserProfile = {
    //name
    setName: (data) => {
        UserProfile.__scopedSetItem('name', data);
    },
    getName: () => {
        return UserProfile.__scopedGetItem('name')
    },

    //Date of Birth
    setDob: (data) => {
        UserProfile.__scopedSetItem('dob', data);
    },
    getDob: () => {
        return UserProfile.__scopedGetItem('dob')
    },

    //Gender
    setGender: (data) => {
        UserProfile.__scopedSetItem('gender', data);
    },
    getGender: () => {
        return UserProfile.__scopedGetItem('gender')
    },

    //Address
    setAddress: (data) => {
        UserProfile.__scopedSetItem('address', data);
    },
    getAddress: () => {
        return UserProfile.__scopedGetItem('address')
    },

    //Aadhar Number
    setAadharNumber: (data) => {
        UserProfile.__scopedSetItem('aadharnumber', data);
    },
    getAadharNumber: () => {
        return UserProfile.__scopedGetItem('aadharnumber')
    },


    __scopeName: 'UserProfile',
    __scopedSetItem: (key, value) => {
        window.localStorage.setItem(UserProfile.__scopeName+'.'+key, value);
    },
    __scopedGetItem: (key) => {
        return window.localStorage.getItem(UserProfile.__scopeName+'.'+key);
    }
}

const Credentials = {
    //public key
    setPublicKey: (data) => {
        Credentials.__scopedSetItem('publicKey', JSON.stringify(data));
    },
    getPublicKey: () => {
        return JSON.parse(Credentials.__scopedGetItem('publicKey'));
    },

    //private key
    setPrivateKey: (data) => {
        Credentials.__scopedSetItem('privateKey', JSON.stringify(data));
    },
    getPrivateKey: () => {
        return JSON.parse(Credentials.__scopedGetItem('privateKey'));
    },

    //keyPair
    setKeyPair: (data) => {
        Credentials.setPublicKey(data.publicKey);
        Credentials.setPrivateKey(data.privateKey);
    },
    getKeyPair: () => {
        return Models.createKeyPair(
            Credentials.getPublicKey(),
            Credentials.getPrivateKey()
        )
    },

    //creation time
    setCreationTime: (data) => {
        Credentials.__scopedSetItem('creationTime', data);
    },
    getCreationTime: () => {
        Credentials.__scopedGetItem('creationTime');
    },

    //expiration time
    setExpirationTime: (data) => {
        Credentials.__scopedSetItem('expirationTime', data);
    },
    getExpirationTime: () => {
        Credentials.__scopedGetItem('expirationTime');
    },

    //timePair
    setTimePair: (data) => {
        Credentials.setCreationTime(data.creationTime);
        Credentials.setExpirationTime(data.expirationTime);
    },
    getTimePair: () => {
        return Models.createTimePair(
            Credentials.getCreationTime(),
            Credentials.getExpirationTime()
        )
    },

    //sign
    setSign: (data) => {
        Credentials.__scopedSetItem('sign', data);
    },
    getSign: () => {
        return Credentials.__scopedGetItem('sign')
    },

    //dataHash
    setDataHash: (data) => {
        Credentials.__scopedSetItem('dataHash', data);
    },
    getDataHash: () => {
        return Credentials.__scopedGetItem('dataHash');
    },

    __scopeName: 'Credentials',
    __scopedSetItem: (key, value) => {
        window.localStorage.setItem(Credentials.__scopeName+'.'+key, value);
    },
    __scopedGetItem: (key) => {
        return window.localStorage.getItem(Credentials.__scopeName+'.'+key);
    }
}