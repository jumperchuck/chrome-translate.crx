HTMLElement.prototype.css = function(name,value){
    if(arguments.length == 0){
        return getComputedStyle(this);
    }else if(arguments.length == 1 && typeof name === 'string'){
        return getComputedStyle(this)[name];
    }else if(arguments.length == 2 && typeof name === 'string'){
        this.style[name] = value;
    }else if(typeof name === 'object'){
        for(var key in name){
            this.style[key] = name[key];
        }
    }
}
var result = null;
var newDiv = document.createElement('div');
newDiv.css({
    padding:'2px 6px',
    background:'#fff',
    boxShadow:'0px 0px 5px #999',
    position:'fixed',
    zIndex:'1000',
    fontSize:'14px',
    borderRadius:'3px',
    lineHeight:'40px',
    textAlign:'left'
});

var img = document.createElement('img');
img.src = 'https://jumperchuck.github.io/img/me.jpg';
img.css({
    marginRight:'5px',
    width:'40px',
    verticalAlign:'middle',
    borderRadius:'50%',
    transition:'transform 0.5s'
});

var span = document.createElement('span');
span.innerHTML = '译:';
span.css('color','#999');

var conText = document.createElement('span');
conText.css('color','#000');

newDiv.appendChild(img);
newDiv.appendChild(span);
newDiv.appendChild(conText);
newDiv.onmouseup = function(e){
    var e = e||event;
    e.cancelBubble = true;
}
img.onmouseover = function(){
    this.css('transform','scale(1.6)');
}
img.onmouseout = function(){
    this.css('transform','scale(1)');
}
var onOff = false;

document.onmouseup = function(e){
    var e = e || event;
    var text = window.getSelection();
    if( text != '' ){
        baiduFanyi(text.toString(),function(){
            document.body.appendChild(newDiv);
            var l = e.clientX + newDiv.offsetWidth;
            var t = e.clientY + newDiv.offsetHeight;
            if(document.body.clientWidth > newDiv.offsetWidth && l > document.body.clientWidth){
                l = e.clientX - (l - document.body.clientWidth);
                newDiv.css('left',l+'px');
            }else {
                newDiv.css('left',e.clientX+'px');
            }
            if(document.body.clientHeight > newDiv.offsetHeight && t > document.body.clientHeight){
                t = e.clientY - (t-document.body.clientHeight);
                newDiv.css('top',t+15+'px');
            }else {
                newDiv.css('top',e.clientY+15+'px');
            }
        });
        onOff = true;
    }else if(onOff){
        document.body.removeChild(newDiv);
        onOff = false;
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
    var url = 'https://fanyi.baidu.com/v2transapi?query=' + encodeURIComponent(text) + '&from=auto&to=en';
    httpRequest(url,function(r){
        result = JSON.parse(r);
        conText.innerHTML = result.trans_result.data[0].dst;
        callback && callback();
    });
}
