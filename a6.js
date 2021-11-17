// find artist from query
function artistQuery() {
    let params = (new URL(document.location)).searchParams;
    if (params.has('artist')) {
        let artistName = params.get('artist');
        console.log(artistName);

        // creating search on MusicBrainz
        let baseURL = "https://musicbrainz.org/ws/2/";
        let search = "artist?query=";
        let queryURL = baseURL + search + artistName;
        console.log(queryURL);
        httpGet(queryURL, getMBID);
    }
}

function httpGet(theURL, cbFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theURL);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cbFunction(this);
        }
    }
}

function getMBID(xhttp) {
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData);

    let artistData = retrievedData.getElementsByTagName('artist')[0];
    console.log(artistData);
    let artistName = artistData.getElementsByTagName('name')[0].innerHTML;
    console.log(artistName);
    let artistMBID = artistData.id;
    console.log(artistMBID);
    queryAlbum(artistMBID)
}

function queryAlbum(artistMBID) {
    // browsing on MusicBrainz
    let baseURL = "https://musicbrainz.org/ws/2/";
    let browse = "release-group?artist=";
    let limit = "&limit=100"
    let queryURL = baseURL + browse + artistMBID + limit;
    console.log(queryURL);
    httpGet(queryURL, getAlbum);
}

function getAlbum(xhttp) {
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData);

    var album = [];
    var date = [];

    let albumData = retrievedData.getElementsByTagName('release-group-list')[0];
    console.log(albumData);
    let albumName = albumData.getElementsByTagName('release-group');
    console.log(albumName);
    let numAlbum = albumName.length;

    // loop to add data into variables
    for (let i = 0; i < numAlbum; i++) {
        let datalist = albumData.getElementsByTagName("release-group")[i];
        let names = datalist.getElementsByTagName('title')[0].innerHTML;
        console.log(names);
        album[i] = names;
        let dates = datalist.getElementsByTagName('first-release-date')[0].innerHTML;
        console.log(dates);
        date[i] = dates;
    }
    //console.log(album);
    //console.log(date);

    output(album, date);
}

function output(names, dates) {
    let list = "<tr><th>Album Name</th><th>Release Date</th></tr>";
    for (i = 0; i < names.length; i++) {
        list += "<tr><td> " + names[i] + "</td>";
        list += "<td> " + dates[i] + "</td></tr>";
    }
    let results = document.getElementById('placeholder');
    results.innerHTML = list;
}

window.onload = artistQuery;