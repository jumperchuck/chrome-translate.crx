/**
 * Created by Administrator on 2017/2/13.
 */
window.onload = function(){
    var inp = document.getElementById('inp');
    var btn = document.getElementById('btn');
    var result = document.getElementById('result');
    var bg = document.getElementById('bg');
    var ball = document.getElementById('ball');
    var onOff = true;
    bg.onclick = function(){
        if(onOff){
            this.style.backgroundColor = '#f8001b';
            ball.style.marginLeft = '15px';
            onOff = false;
        }else{
            this.style.backgroundColor = '#7fa2c3';
            ball.style.marginLeft = 0;
            onOff = true;
        }
    }
    btn.onclick = function(){
        var txt = inp.value;
        baiduFanyi(txt,function(data){
            result.innerHTML = data;
        });
    }
    inp.onkeypress = function(e){
        var e = e || event;
        if(e.keyCode==13){
            baiduFanyi(this.value,function(data){
                result.innerHTML = data;
            });
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
function baiduFanyi(text,callback) {
    var url = 'https://fanyi.baidu.com/v2transapi?query=' + encodeURIComponent(text) + '&from=auto&to=en';
    httpRequest(url,function(r){
        result = JSON.parse(r);
        callback && callback(result.trans_result.data[0].dst);
    });
}