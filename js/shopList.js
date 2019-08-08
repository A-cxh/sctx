;class ShopList{
    constructor(){
        this.box1 = $("#shopList").find(".remai");
        this.box2 = $("#main").find(".aside").find("ul");
        this.box3 = $("#main").find(".shops").find("ul");
        this.box4 = $("header").find(".header-r").find(".t-num");
        this.oCar = $("#main").find(".shops").find("ul");
        this.url = "http://localhost/GulpTest/sctx/data/data.json";
        this.left = $("#btnL");
        this.right = $("#btnR");
        this.pageCont = $("#page");
        this.index = 0;
        this.num = 12;

        this.load();

        this.addEventInf();
        this.addEvent();
        this.addCar();
    }

    load(){
        var that = this;
        Ajax({
            type: "post",
            url: this.url,
            data: {
                columnName: "cb",
                cb: "qfh"
            },
            success:function(res){
                that.res = JSON.parse(res);
                // console.log(that.res);
                that.displayList();
                that.displayPage();
            },
            error:function(res){
                console.log(res);
            }
        })
    }

    displayList(){
        var str1 = "";
        for(var i = 4; i < 8; i++){
            str1 += `<dd>
                        <a href="shopDetails.html" target="_blank" class = "remaiList">
                            <img src="${this.res[i].url}" title="${this.res[i].name}" id = "${this.res[i].goodsid}">
                            <p title="${this.res[i].name}">${this.res[i].name}</p>
                            <span>特价:<b>${this.res[i].price}</b></span>
                            <i href="shopDetails.html" target="_blank">查看详情</i>
                        </a>
                    </dd>`;
        }
        this.box1.html(str1);

        var str2 = "";
        for(var i = 16; i < 20; i++){
            str2 += `<li>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}" title="${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            <p title="${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </li>`;
        }
        this.box2.html(str2);
        
        var str3 = "";
        for(var i = this.index*this.num; i < (this.index+1)*this.num; i++){
            if(i < this.res.length){
                str3 += `<li>
                            <a href="shopDetails.html" target="_blank">
                                <div class="imgBox">
                                <img src="${this.res[i].url}" title="${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                                </div>
                                <p title="${this.res[i].name}">${this.res[i].name}</p>
                                <span>${this.res[i].price}<i>包邮</i></span>
                            </a>
                            <b><p class = "add">添加成功</p></b>
                            
                        </li>`;
            }
        }
        this.box3.html(str3);
    }

    displayPage(){
        var str4 = "";
        console.log(this.res)
        this.ps = Math.ceil(this.res.length / this.num);
        for(var i = 0; i < this.ps; i++){
            str4 += `<li id = "mypages">${i+1}</li>`;
        }
        this.pageCont.html(str4);

        this.setActive();
    }

    setActive(){
        for(var i = 0; i < this.ps; i++){
            this.pageCont.children().attr("class", "");
        }
        this.pageCont.children().eq(this.index).attr("class", "active");
    }

    addEvent(){
        var that = this;
        this.left.on("click", function(){
            that.changeIndex("l");
        })
        this.right.on("click", function(){
            that.changeIndex("r");
        })
        this.pageCont.on("click", "#mypages", function(){
            that.index = $(this).index();
            that.setActive();
            that.displayList();
            that.changeBtn();
        })
    }

    changeIndex(lr){
        if(lr == "l"){
            if(this.index == 0){
                this.index = 0;
            }else{
                this.index--;
            }
        }
        if(lr == "r"){
            if(this.index == this.ps-1){
                this.index = this.ps-1;
            }else{
                this.index++;
            }
        }
        this.setActive();
        this.displayList();
        this.changeBtn();
    }

    changeBtn(){
        if(this.index == 0){
            this.left.css({
                border:"1px solid rgb(158, 160, 163)",
                color:"rgb(158, 160, 163)"
            })
        }else{
            this.left.css({
                border:"1px solid rgb(70, 150, 255)",
                color:"rgb(0, 174, 255)"
            })
        }
        if(this.index == this.ps-1){
            this.right.css({
                border:"1px solid rgb(158, 160, 163)",
                color:"rgb(158, 160, 163)"
            })
        }else{
            this.right.css({
                border:"1px solid rgb(70, 150, 255)",
                color:"rgb(0, 174, 255)"
            })
        }
    }

    addEventInf(){
        var that = this;
        $(document).on("click", "img", function(){
            // console.log(this)
            console.log(this.id);
            for(var i = 0; i < that.res.length; i++){
                if(this.id == that.res[i].goodsid){
                    console.log(that.res[i]);
                    localStorage.setItem("shopInf", JSON.stringify(that.res[i]));
                }
            }
            return that.res[i];
        })
        that.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        var str4 = 0;
        that.goods.forEach((goodsVal)=>{
            str4 += parseInt(goodsVal.num);
        })
        that.box4.html(str4);
    }

    addCar(){
        var that = this;
        this.oCar.on("click.abc", "b", function () {
            // console.log($(this).prev("a").find("img")[0].id);
            var data = $("header").find(".p2").attr("status");
            if (data == "in") {
                $(this).find(".add").css({
                    display:"block"
                })
                setTimeout(()=>{
                    $(this).find(".add").css({
                        display:"none"
                    })
                },500)

                for (var i = that.index*that.num; i < (that.index+1)*that.num; i++) {
                    if(i < that.res.length){
                        if ($(this).prev("a").find("img")[0].id == that.res[i].goodsid) {
                            console.log(that.res[i].num);
                            that.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
                            if (that.goods.length == 0) {
                                that.goods.push({
                                    id: that.res[i].goodsid,
                                    num: 1
                                })
                                that.res[i].num--;
                            } else {
                                var j;
                                var onoff = that.goods.some((val, index) => {
                                    j = index;
                                    return val.id == that.res[i].goodsid;
                                })
                                if (onoff) {
                                    that.goods[j].num++;
                                    that.res[i].num--;
                                } else {
                                    that.goods.push({
                                        id: that.res[i].goodsid,
                                        num: 1
                                    })
                                    that.res[i].num--;
                                }
                            }

                            if (that.res[i].num == 0) {
                                $(this).off("click.abc");
                                var mb = $("<p class = 'mb'>售罄</p>");
                                $(this).prev("a").find("img").after(mb);
                            }
                            console.log(that.res[i].num)
                            console.log(that.goods)
                            setCookie("goods", JSON.stringify(that.goods));
                        }
                    }
                }
            } else {
                alert("请先登录！");
                location.href = "../html/log.html";
            }
        })
    }
}

new ShopList();