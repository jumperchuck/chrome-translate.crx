var result = null;
var newDiv = document.createElement('div');
var img = document.createElement('img');
var sp1 = document.createElement('span');
var sp2 = document.createElement('span');
img.id = 'ck';
img.alt = '帅哥';
img.src = 'http://jumperchuck.github.io/img/me.jpg';
img.style.marginRight = '5px';
img.style.width = '40px';
img.style.verticalAlign = 'middle';
img.style.borderRadius = '50%';
img.style.transition = 'transform 1s';
sp1.innerHTML = '译:';
sp1.style.color = '#999';
newDiv.style.padding = '2px 6px';
newDiv.style.background = '#fff';
newDiv.style.boxShadow = '0px 0px 5px #999';
newDiv.style.position = 'fixed';
newDiv.style.zIndex = '1000';
newDiv.style.fontSize = '14px';
newDiv.style.borderRadius = '3px';
newDiv.appendChild(img);
newDiv.appendChild(sp1);
newDiv.onmouseup = function(e){
    var e = e||event;
    e.cancelBubble = true;
}
img.onmouseover = function(){
    this.style.transform = 'scale(3)';
}
img.onmouseout = function(){
    this.style.transform = 'scale(1)';
}
var onOff = false;
document.onmouseup = function(e){
    var e = e || event;
    var text = window.getSelection();
    if( text != '' ){
        baiduFanyi(text.toString());
        sp2.innerHTML = '';
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
        sp2.innerHTML = result.trans_result.data[0].dst;
        newDiv.appendChild(sp2);
        // newDiv.innerHTML = span + result.trans_result.data[0].dst;
    });
}
