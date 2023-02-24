export const session = {
    loginState: false,

    login: (profile) => {
        session.loginState = true;

        //populating profile data
        session.internal.vars.profile.name = profile.name;
        session.internal.vars.profile.aadhar = profile.aadhar;
        session.internal.vars.profile.gender = profile.gender;
        session.internal.vars.profile.dob = profile.dob;
        session.internal.vars.profile.address = profile.address;

        session.internal.funcs.callLoginListeners();
    },
    logout: () => {
        session.loginState = false;

        session.internal.vars.profile.name = '';
        session.internal.vars.profile.aadhar = '';
        session.internal.vars.profile.gender = '';
        session.internal.vars.profile.dob = '';
        session.internal.vars.profile.address = '';

        session.internal.funcs.callLoginListeners();
    },
    display: () => {
        console.log(session.internal.vars.profile);
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
                aadhar: '',
                gender: '',
                dob: '',
                address: '',
            },
        },
    },
};
