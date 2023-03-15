import { Request } from './requests';

const env = 'DEV';
// const env = 'PROD';
const pathPrefix = '/api';
const pathPostfix = '';

const paths = {
    register: pathPrefix + '/user/register' + pathPostfix,
    requestRefresh: pathPrefix + '/user/requestRefresh' + pathPostfix,
    issueRefresh: pathPrefix + '/user/issueRefresh' + pathPostfix,
    getPublicKey: pathPrefix + '/user/getPublicKey' + pathPostfix,
};

export const register = (data) => {
    //dev setup
    if (env === 'DEV') {
        return new Promise((resolve, reject) => {
            resolve({
                keyPair: {
                    publicKey:
                        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5WvGq6/RfjEHi//EASe4NoX92iKVveWv8nL/97cgQmHyrheyYUJT3fBRAsgwJtWD5hM89oWiAaDUQDJXCGAiAwNsO2jwGrYYwkp03VbeQGbYyyx/GthDY6VlMiGIaUW0xtxM+MAeNO7ELyPaNtaI7VWhKL5xmboW1jz6KP1zn/AtbOmrzGBzGxkMNqoAnpok8rxSAbzPNk2Oe6oJ9XzGUv8o3bruqzOAa93ANvguO4jAEw6nJXUrj84HseEjA3s7pi6ASCXHNLoy15IfzTe/ikn4KGxh6vQ4dFd18/pkA0kSrPM4g+FUCpnlXLEWL648IMDYD5HSH5wUVPduxfLaIQIDAQAB',
                    privateKey:
                        'MIIEowIBAAKCAQEA5WvGq6/RfjEHi//EASe4NoX92iKVveWv8nL/97cgQmHyrheyYUJT3fBRAsgwJtWD5hM89oWiAaDUQDJXCGAiAwNsO2jwGrYYwkp03VbeQGbYyyx/GthDY6VlMiGIaUW0xtxM+MAeNO7ELyPaNtaI7VWhKL5xmboW1jz6KP1zn/AtbOmrzGBzGxkMNqoAnpok8rxSAbzPNk2Oe6oJ9XzGUv8o3bruqzOAa93ANvguO4jAEw6nJXUrj84HseEjA3s7pi6ASCXHNLoy15IfzTe/ikn4KGxh6vQ4dFd18/pkA0kSrPM4g+FUCpnlXLEWL648IMDYD5HSH5wUVPduxfLaIQIDAQABAoIBAQCDldZkYLpii5KNjMwJ8ZMpyp53/8AtI9FP2P/RP7qD+JPtoG/Scu2RbSW518Iuc+ZsDvq3Vpw+HNXAYF8k0aaQXeU1ChI0796xiW0QCqP9AkA0ADiC2CmGvLWXFD6eSrnOGUsYnXB14cCqXQDq1Q/COIvvx5N2nZI9nMnKutwXjd7I8bNJ49MA98RLmmzCVdHbGGDfXzanVawLdufpK2Fr4JarKXjIKXRKMARtxd2JwzDC7wPUBSBzVzBUq9Vry374ICBqmAUk8TlhfogObF2y02KX6/8VxafsfDj9JR5ebQ1TvfvYJlUI+0ddZ54xFLXjg4HBGU7fJBu/pfK05TslAoGBAP+310g4O86LLRkceKnbn+EzrUVT259ZqVRRkWxZJQwhH/TV8PkTqYXZdNkgUT5VaoJLp4hdv9XLzFqW9YUaRUYjTLQhCGyTQqS4WngLgpP4nhp1tb40AFvSyhd022vFuHOiCskUl/aH1WqqLeJ5tJGE3x22ypt4r2AjRn4ScQTTAoGBAOWsg7iR2qJBPdLdnX55rdQ9EKuvjDETxTN5wIvnI/ToCgYi2lbHwzYQaKc/jdFetO1MYSDs2Khr6kcM/Cbw2kxOkCZDs8JLLOjr5p7EYZ/6yng0tVM1k0HF26cS1w3YtI/dB8C3l62Q7mOF+NC45AzUFg0amQ1WI3mF9afiZdy7AoGAVyMSHO3sk0khqPjmtRq9tEOju4gDwp0O8kiJQV5vHV78QLXWU0m77nxXMNWuWYtJq/STtggcIoI7tHLUXvLAwFGvBYJsGHNltjOLwHRLnpiNZ37M229k3+VIMA4F5weM/vosqrB1x/ApbRtoX1ARk7SvQrTS/X92Y1Ah6TvnfzkCgYB31vBUGibOiuRLZr+LAsqk98f/DXZFFV/MYDcLyOuGGp1AXmc26Lz/NMimnA7PtG8LctMrbuoN12FC+Y+Ichw1vLiSfrkJJFimoJCRPz8BTsbeugHzDP1tUGQwZTA5VV3Bwz8MW7+VHQ6Gd51Aq3izCOcIp1w9DTkta6ymkQc9iQKBgCON4/2uAbnDfLwTC2OoolQs1TkpLmxXqjqbwv9vZi6shZX3LY9VOUfu+f7DVWbrFP2S5swxPocmqWsnvbOI/+rAAQqeRE+CUtcIS/7UyCIgO84K/A+TOKuvx+C+i3E1qPGYaA79dKL35gUPhqnC5UtJ0vKs8mM7bu0Jz35TNTbE',
                },
                timePair: {
                    creationTime: '2023-03-15T08:23:21.590Z',
                    expirationTime: '2023-03-18T08:23:21.590Z',
                },
                sign: 'LK3FLv4QcWbkUWfvf80UOxJk8AFrvgDlt6nMXAR7cOLyW5ypAKbfSB10YwutnXRcDk9T6mvd1yh3909Qvc24kUAgolH8wj7qR61M1hSk5gGrqerzGtYVhIOakt848+70x1kHND7bQYP/bv56Yl+My3jzur38LA5FX9JxQ4IfqrQ6txWZbwHl3H7LOJlK0JG/MuyTKHanSBoXDo3kAO5RdXOC3plt89M5gRZTphVpxtXEoWFTIpNOAMthpyJfroGLkk2C/xAj//mqZVyDqqvXF6VSV4pFv+uzDb8ZI3oyYDNlA3KjEcwAU/H9jKDjMysbAYHdxFe3U4QhrQUfbASvaQ==',
                dataHash: 'f67c67cea82d5afcfb9e4f896efd57df',
            });
        });
    }

    //prod setup
    if (env === 'PROD') {
        return new Promise(async (resolve, reject) => {
            const requestBody = await Request.post(paths.register, data);
            if (requestBody.success === true) {
                resolve(requestBody.data);
            } else {
                reject(requestBody.msg);
            }
        });
    }
};

export const requestRefresh = (data) => {
    return new Promise((resolve, reject) => {
        resolve(Request.post(paths.requestRefresh, data));
    });
};

export const issueRefresh = (data) => {
    return new Promise((resolve, reject) => {
        resolve(Request.post(paths.issueRefresh, data));
    });
};

export const getPublicKey = () => {
    //dev setup
    if (env === 'DEV')
        return new Promise((resolve, reject) => {
            resolve(
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxQuC85Z3c/OcuHYMsdj6H6IBO9fdjElBpd0Oi5r+QCCY5CYuO3SOPUxtOb+FW2uUefKmmFs6WM65rJ9Yjs601ywG9SiShx9XsHsKC80WE5ZtTYQACb1Z48YT1L3Yht82ybDetUtSuImTNmIUCv2tnO+rQMFy2ekkd6vEhBjjuE3DhoQj5KlSPQnOjC5R4GCLpiNPS0XjYI3BRFLwGZ1xs1HoRHf9l+oNLFP3EJYZT2sPwlYLo6PjfHMETyC/w8Vcxr8Z4hZYiShPErHgGRa7m6xz44zVj/6Pdu7ZwPizagiJ0T2qIp8XYnrvTcTXMcq8jO3bfDgnF84bDMATkgp4BwIDAQAB'
            );
        });

    //prod setup
    if (env === 'PROD') {
        return new Promise((resolve, reject) => {
            resolve(Request.get(paths.getPublicKey));
        });
    }
};
