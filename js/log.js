;class Log{
    constructor(){
        this.url = "http://api.icodeilife.cn:81/user";
        this.user = $("#name");
        this.pass = $("#pass");
        this.sub = $("#sub");
        this.cont = $(".cont");
        this.a = 0;
        this.t = 3;

        this.addEvent();
    }

    addEvent(){
        var that = this;
        if(this.a == 0){
            this.sub.on("click",function(){
                that.load();
                that.a = 1;
            })
        }
    }

    load(){
        $.ajax({
            url:this.url,
            data:{
                type:"login",
                user:this.user.val(),
                pass:this.pass.val()
            },
            success:(res)=>{
                this.res = JSON.parse(res);

                if(this.res.code == 0){
                    this.cont.html(this.res.msg + "重新登录");
                    this.cont.show();
                    setTimeout(()=>{
                        this.cont.hide();
                        this.user.val("");
                        this.pass.val("");
                    },2000)
                }else if(this.res.code == 2){
                    this.cont.html(this.res.msg + "重新输入或去注册");
                    this.cont.show();
                    setTimeout(()=>{
                        this.cont.hide();
                        this.user.val("");
                        this.pass.val("");
                    },2000)
                }else if(this.res.code == 1){
                    this.state();
                    this.cont.show();
                    this.cont.html("登录成功，准备<span class = 't'>" + this.t + "</span>s后跳转到首页")
                    var t = setInterval(() => {
                        this.t--;
                        this.cont.html("登录成功，准备<span class = 't'>" + this.t + "</span>s后跳转到首页")
                        if (t == 0) {
                            clearInterval(t);
                        }
                    },1000);
                    setTimeout(()=>{
                        this.cont.hide();
                        location.href = "index.html";
                    },3000);

                    if(this.a == 1){
                        this.sub.val("立即跳转至首页");
                        this.sub.on("click", ()=>{
                            location.href = "index.html";
                            this.a = 0;
                        })
                    }
                }
            }
        })
    }

    state(){
        localStorage.setItem("LoginUser", JSON.stringify(this.res.msg));
    }
}

new Log();