// ajax({
//     type:"",
//     url:"",
//     data:{},
//     success:function(){},
//     error:function(){},
//     timeout:100,
//     beforeSend:function(){}
// })

function Ajax(options){
    let {type, url, data, beforeSend, timeout, success, error} = options;

    type = type || "get";
    timeout = timeout || 500;
    data = data || {};

    let str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }

    let d = new Date();
    let ajax = new XMLHttpRequest();

    if(type == "get"){
        url = url + "?" + str + "__cxht=" + d.getTime();
        ajax.open("get", url, true);
        ajax.onreadystatechange = function(){
            if(ajax.readyState != 4){
                beforeSend && beforeSend();
                beforeSend = null;
            }else if(ajax.readyState == 4 && ajax.status == 200){
                success && success(ajax.responseText);
                error = null;
            }else if(ajax.readyState == 4 && ajax.status != 200){
                error && error(ajax.status);
                error = null;
            }
        }
        ajax.send();
    }else if(type == "post"){
        ajax.open("post", url, true);
        ajax.onreadystatechange = function(){
            if(ajax.readyState != 4){
                beforeSend && beforeSend();
                beforeSend = null;
            }else if(ajax.readyState == 4 && ajax.status == 200){
                success && success(ajax.responseText);
                error = null;
            }else if(ajax.readyState == 4 && ajax.status != 200){
                error && error(ajax.status);
                error = null;
            }
        }
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(str.slice(0, str.length-1));

        // url = str.slice(0, str.length-1);
    }else if(type == "jsonp"){
        url = url + "?" + str + "__cxht=" + d.getTime();

        let script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);

        beforeSend && beforeSend();
        beforeSend = null;

        window[data[data.columnName]] = function(res){
                success && success(res);
                error = null;
            }
    }

    setTimeout(() => {
        error && error("timeout");
        success = null;
    }, timeout);
}