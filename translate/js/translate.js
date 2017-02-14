var result = null;
var newDiv = document.createElement('div');
newDiv.style.padding = '2px 6px';
newDiv.style.background = '#fff';
newDiv.style.boxShadow = '0px 0px 5px #999';
newDiv.style.position = 'fixed';
newDiv.style.zIndex = '1000';
newDiv.style.fontSize = '14px';
newDiv.style.borderRadius = '3px';
newDiv.style.lineHeight = '40px';
newDiv.style.textAlign = 'left';
newDiv.style.transition = 'all 1s';
var img = document.createElement('img');
img.id = 'ck';
img.alt = '帅哥';
img.src = 'https://jumperchuck.github.io/img/me.jpg';
img.style.marginRight = '5px';
img.style.width = '40px';
img.style.verticalAlign = 'middle';
img.style.borderRadius = '50%';
img.style.transition = 'transform 1s';

var span = document.createElement('span');
span.innerHTML = '译:';
span.style.color = '#999';

var conText = document.createElement('span');
conText.style.color = '#000';

newDiv.appendChild(img);
newDiv.appendChild(span);
newDiv.appendChild(conText);
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
document.onmouseup = function(e){
    var e = e || event;
    var text = window.getSelection();
    if( text != '' ){
        // conText.innerHTML = '';
        baiduFanyi(text.toString(),function(){
            document.body.appendChild(newDiv);
            var l = e.clientX + newDiv.offsetWidth;
            var t = e.clientY + newDiv.offsetHeight;
            if(document.body.clientWidth > newDiv.offsetWidth && l > document.body.clientWidth){
                l = e.clientX - (l - document.body.clientWidth);
                newDiv.style.left = l + 'px';
            }else {
                newDiv.style.left = e.clientX + 'px';
            }
            if(document.body.clientHeight > newDiv.offsetHeight && t > document.body.clientHeight){
                t = e.clientY - (t-document.body.clientHeight);
                newDiv.style.top = t + 15 + 'px';
            }else {
                newDiv.style.top = e.clientY + 15 + 'px';
            }
        });
    }
    else{
        document.body.removeChild(newDiv);
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
    xhr.onerror = function(){
        callback(false);
    }
    xhr.send();
}
function baiduFanyi(text,callback) {
    var url = 'https://fanyi.baidu.com/v2transapi?query=' + encodeURIComponent(text) + '&lang=auto';
    httpRequest(url,function(r){
        result = JSON.parse(r);
        conText.innerHTML = result.trans_result.data[0].dst;
        callback && callback();
    });
}
