class GetInf{
    constructor(){
        this.box1 = $("#content").find(".table");
        this.box2 = $("#content").find(".bbox").find(".bimg");
        this.box3 = $("#content").find(".small");
        this.box4 = $("#content").find(".details").find(".title");
        this.box5 = $("#content").find(".num").find("i");
        this.box6 = $("header").find(".header-r").find(".t-num");

        this.oCar = $("#content").find(".details").find(".car");
        this.getTnf();
        this.addCar();
    }

    addCar(){
        var that = this;
        var userGoods = [];
        userGoods.unshift(JSON.parse(localStorage.getItem("LoginUser")));

        this.oCar.on("click.abc", function(){
            // console.log($(this).parent(".details").prev(".imgBox").find(".table").find("img")[0].id)
            var data = $("header").find(".p2").attr("status");
            if (data == "in") {
                that.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
                if (that.goods.length == 0) {
                    that.goods.push({
                        id: that.inf.goodsid,
                        num: 1
                    })
                    that.inf.num--;
                } else {
                    var j;
                    var onoff = that.goods.some((val, index) => {
                        j = index;
                        return val.id == that.inf.goodsid;
                    })
                    if (onoff) {
                        that.goods[j].num++;
                        that.inf.num--;
                    } else {
                        that.goods.push({
                            id: that.inf.goodsid,
                            num: 1
                        })
                        that.inf.num--;
                    }
                }
                var str3 = "";
                str3 += `${that.inf.num}`;
                that.box5.html(str3);


                // console.log(that.goods);
                setCookie("goods", JSON.stringify(that.goods));

                if (that.inf.num == 0) {
                    that.oCar.off("click.abc");
                    var mb = $("<p class = 'mb'>售罄</p>");
                    $(this).parent(".details").prev(".imgBox").find(".table").find("img").after(mb);
                }
                // if(userGoods.length == 0){
                    userGoods.push(JSON.parse(JSON.stringify(that.goods)));
                    console.log([userGoods[0],userGoods[userGoods.length-1]]);
                    setCookie("userGoods", JSON.stringify([userGoods[0],userGoods[userGoods.length-1]]));
                // }else{
                    // userGoods[userGoods.length-1].push(JSON.parse(JSON.stringify(that.goods)));

                // }
            } else {
                alert("请先登录！");
                location.href = "../html/log.html";
            }
        })
    }
    
    getTnf(){
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        
        // console.log(localStorage.getItem("shopInf"));
        this.inf = JSON.parse(localStorage.getItem("shopInf"));
        // console.log(this.inf);
        this.display();
    }

    display(){
        var str1 = "";
        str1 += `<img src="${this.inf.url}" id = "${this.inf.goodsid}"/>`;
        this.box1.html(str1);
        this.box2.html(str1);
        this.box3.html(str1);

        var str2 = "";
        str2 += `<h2>${this.inf.name}</h2>
                <p class = "price"><span>售价</span>${this.inf.price}</p>`;
        this.box4.html(str2);

        var str3 = "";
        str3 +=  `${this.inf.num}`;
        this.box5.html(str3);

        var str4 = 0;
        this.goods.forEach((goodsVal)=>{
            str4 += parseInt(goodsVal.num);
            
        })
        this.box6.html(str4);
    }
}

new GetInf()