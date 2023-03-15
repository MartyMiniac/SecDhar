export const Request = {
    domain: 'http://localhost:5000',
    post: (path, body) => {
        return new Promise((resolve, reject) => {
            const postBody = JSON.stringify(body);
            fetch(Request.domain + path, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                body: postBody,
            })
                .then((data) => {
                    resolve(data.json());
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    get: (path) => {
        return new Promise((resolve, reject) => {
            fetch(Request.domain + path, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow'
            })
                .then((data) => {
                    resolve(data.json());
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
