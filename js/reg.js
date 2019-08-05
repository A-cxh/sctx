;class Reg {
    constructor() {
        this.url = "http://api.icodeilife.cn:81/user";
        this.form = $("form");
        this.user = $("#name");
        this.pass = $("#pass");
        this.repass = $("#repass");
        this.check = $("#check");
        this.tel = $("#tel");
        this.email = $("#email");
        this.sub = $("#sub");
        this.cont = $(".cont");
        this.s = 0;
        this.t = 3;
        
        this.checkPass();
        this.checkForm();
        this.addEvent();
    }

    checkPass(){
        this.pass.on("input", ()=>{
            var str = this.pass.val();
            var n = 0;
            var reg1 = /\d/;
            var reg2 = /[a-zA-Z]/;
            var reg3 = /[~!@#$%^&*?+/*`]/;

            if(reg1.test(str)){
                n = n + 1;
            }
            if(reg2.test(str)){
                n = n + 1;
            }
            if(reg3.test(str)){
                n = n + 1;
            }
            this.check.find("li").css({background:"rgb(170, 170, 170)", color:"rgb(170, 170, 170)"})
            
            if(str.length == 0 || str.length >= 16){
                this.cont.html("密码错误，密码长度为1-16位");
                this.cont.show();
                setTimeout(() => {
                    this.cont.hide();
                    this.pass.val("");
                }, 1000)
            }
            if(n == 1){
                this.check.find("li").eq(0).css({background:"red", color:"white"})
            }else if(n == 2){
                this.check.find("li").eq(0).css({background:"red", color:"white"})
                this.check.find("li").eq(1).css({background:"orange", color:"white"})
            }else if(n == 3){
                this.check.find("li").eq(0).css({background:"red", color:"white"})
                this.check.find("li").eq(1).css({background:"orange", color:"white"})
                this.check.find("li").eq(2).css({background:"rgb(15, 200, 0)", color:"white"})
            }
        })
    }

    checkForm(){
        this.form.validate();
        $("input").on("change", function(){
            if($("input").is(".valid")){
                $(this).nextAll("div").css({
                    // width:150,
                    // height:20,
                    display:"inline-block",
                    position:"absolute",
                    left:165,
                    top:3
                })
            }
            
            if($("input").is(".error")){
                $(this).nextAll("div").hide()
            }
        })
    }
            
    // console.log($(this)[0].outerHTML)

    // console.log($(this).next("label").is($("[style = 'display: none']")))


    addEvent() {
        var that = this;
        if (this.s == 0) {
            this.sub.on("click", function () {
                that.load();
                that.s = 1;
            })
        }
    }

    load() {
        $.ajax({
            url: this.url,
            data: {
                type: "register",
                user: this.user.val(),
                pass: this.pass.val(),
                repass: this.repass.val(),
                tel: this.tel.val(),
                email: this.email.val()
            },
            success: (res) => {
                res = JSON.parse(res);
                console.log(res);
                if (res.code == 1 && $("tbody").find("input").hasClass("valid")) {
                    this.cont.show();
                    this.cont.html("注册成功，准备<span class = 't'>" + this.t + "</span>s后跳转到登录页")
                    var t = setInterval(() => {
                        this.t--;
                        this.cont.html("注册成功，准备<span class = 't'>" + this.t + "</span>s后跳转到登录页")
                        if (t == 0) {
                            clearInterval(t);
                        }
                    }, 1000);
                    setTimeout(() => {
                        this.cont.hide();
                        location.href = "log.html";
                    }, 3000);

                    if (this.s == 1) {
                        this.sub.val("立即跳转至登录");
                        this.sub.on("click", () => {
                            location.href = "log.html";
                            this.s = 0;
                        })
                    }
                }else{
                    this.cont.html("注册失败，请重新注册");
                    this.cont.show();
                    setTimeout(() => {
                        this.cont.hide();
                        location.href = "reg.html";
                    }, 2000)
                } 
            }
        })
    }
}

new Reg();