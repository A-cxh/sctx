//添加cookie
function setCookie(key, value, options){
    options = options || {};

    var strE = strP = "";
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        strE = ";expires=" + d;
    }
    
    // if(options.path){
    //     strP = ";path=" + options.path;
    // }
    strP = options.path ? ";path="+options.path : "";

    document.cookie = key + "=" + value + strE + strP;
}

//删除cookie
function removeCookie(key, options){
    options = options || {};

    options.expires = -1;

    setCookie(key, null, options);
}

//获取cookie
function getCookie(key){
    var str = document.cookie;
    var arr =str.split("; ");
    // for(var i = 0; i <arr.length; i++){
    //     if(arr[i].split("=")[0] == key){
    //         return arr[i].split("=")[1];
    //     }
    // }
    // return "";

    var v = "";
    arr.some((value) => {
        var sarr = value.split("=");
        v = sarr[1];
        return sarr[0] == key;
    })
    return v;
}