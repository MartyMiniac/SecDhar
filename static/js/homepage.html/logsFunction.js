var tableDataJson = localStorage.getItem('tableData');

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

async function getLocation(lat, long) {
    const api_url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
    let response = await fetch(api_url);
    let data = await response.json();
    return data['city'];
}

function addNewData(c1, c2, c3, c4) {
    var newData = {
        "Location": c1,
        "Latitude": c2,
        "Longitude": c3,
        "Time": c4
    }
    if (tableDataJson) {
        var tableData = JSON.parse(tableDataJson);
        tableData.push(newData);
    } else {
        var tableData = [newData];
    }
    var updatedTableDataJson = JSON.stringify(tableData);
    localStorage.setItem('tableData', updatedTableDataJson);
}

async function success(pos) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`
    const crd = pos.coords;
    let c1 = await getLocation(crd.latitude, crd.longitude);
    let c2 = crd.latitude;
    let c3 = crd.longitude;
    let c4 = currentDate;
    addNewData(c1, c2, c3, c4);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function addRow() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function retrieveLastFiveTableData() {
    var tableDataJson = localStorage.getItem('tableData');
    if (tableDataJson) {
        var tableData = JSON.parse(tableDataJson);
        var table = document.getElementById('myTable');
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        var startIndex = Math.max(tableData.length - 5, 0);
        for (var i = startIndex; i < tableData.length; i++) {
            var rowData = tableData[i];
            var row = table.insertRow();
            for (var columnName in rowData) {
                if (rowData.hasOwnProperty(columnName)) {
                    var cell = row.insertCell();
                    cell.textContent = rowData[columnName];
                }
            }
        }
    } else {
        console.log('No table data found in localStorage');
    }
}