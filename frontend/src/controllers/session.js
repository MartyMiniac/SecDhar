import { register } from '../helpers/apiCalls';
export const session = {
    loginState: false,

    login: (profile) => {
        session.loginState = true;

        //populating profile data
        session.internal.vars.profile.name = profile.name;
        session.internal.vars.profile.aadharNo = profile.aadhar;
        session.internal.vars.profile.gender = profile.gender;
        session.internal.vars.profile.dob = profile.dob;
        session.internal.vars.profile.address = profile.address;

        register(session.internal.vars.profile).then((data) => {
            session.internal.vars.creds.keyPair = data.keyPair;
            session.internal.vars.creds.timePair = data.timePair;
            session.internal.vars.creds.sign = data.sign;
            session.internal.vars.creds.dataHash = data.dataHash;
        });

        session.internal.funcs.callLoginListeners();
    },
    logout: () => {
        session.loginState = false;

        session.internal.vars.profile.name = '';
        session.internal.vars.profile.aadharNo = '';
        session.internal.vars.profile.gender = '';
        session.internal.vars.profile.dob = '';
        session.internal.vars.profile.address = '';

        session.internal.funcs.callLoginListeners();
    },
    display: () => {
        console.log(session.internal.vars.profile);
    },
    getCreds: () => {
        return session.internal.vars.creds;
    },
    addLoginListener: (func) => {
        session.internal.vars.loginListenerFuncs.push(func);
    },

    internal: {
        funcs: {
            callLoginListeners: () => {
                session.internal.vars.loginListenerFuncs.forEach((func) =>
                    func()
                );
            },
        },
        vars: {
            loginListenerFuncs: [],
            profile: {
                name: '',
                aadharNo: '',
                gender: '',
                dob: '',
                address: '',
            },
            creds: {
                keyPair: {},
                timePair: {},
                sign: '',
                dataHash: '',
            },
        },
    },
};
