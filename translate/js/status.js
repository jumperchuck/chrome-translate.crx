function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(true);
        }
    }
    xhr.onerror = function(){
        callback(false);
    }
    xhr.send();
}

setInterval(function(){
    httpRequest('http://www.baidu.com/', function(status){
        chrome.browserAction.setIcon({path: 'img/' + (status?'icon.png':'1.jpg')});
    });
},1000);