var result = null;
var newDiv = document.createElement('div');
newDiv.style.padding = '10px';
newDiv.style.background = '#fff';
newDiv.style.border = '1px solid #000';
newDiv.style.position = 'fixed';
newDiv.style.zIndex = '1000';
newDiv.style.fontSize = '18px';
newDiv.style.color = 'red';
newDiv.style.borderRadius = '5px';
newDiv.onmouseup = function(e){
    var e = e||event;
    e.cancelBubble = true;
}
var onOff = false;
document.onmouseup = function(e){
    var e = e || event;
    var text = window.getSelection();
    if( text != '' ){
        baiduFanyi(text.toString());
        newDiv.innerHTML = '';
        newDiv.style.left = e.clientX + 'px';
        newDiv.style.top = e.clientY + 15 + 'px';
        document.body.appendChild(newDiv);
        onOff = true;
    }
    else{
        if(onOff){
            document.body.removeChild(newDiv);
            onOff = false;
        }
    }
}
function httpRequest(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}
function baiduFanyi(text) {
    var url = 'http://fanyi.baidu.com/v2transapi?query=' + encodeURIComponent(text) + '&lang=auto';
    httpRequest(url,function(r){
        result = JSON.parse(r);
        newDiv.innerHTML = result.trans_result.data[0].dst;
    });
}
