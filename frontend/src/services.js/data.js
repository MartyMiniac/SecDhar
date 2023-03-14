export let qrData;
fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(data => { qrData = JSON.stringify(data[0].name); });

export let logsData;
fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(data => { logsData = data; });
