;class Car{
    constructor(){
        this.dd = $("#shops").find(".car").find("dl");
        this.box1 = $(".jiesuan").find("span").find("i");
        this.box2 = $(".jiesuan").find("span").find("b");
        this.box3 = $("header").find(".header-r").find(".t-num");

        this.url = "http://localhost/GulpTest/sctx/data/data.json";

        this.load();
        this.addRemove();
        this.status = 0;
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
                that.getCookie();
            },
            error:function(res){
                console.log(res);
            }
        })
    }

    getCookie(){
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        // console.log(this.goods);
        // console.log(this.res)
        this.display();
    }

    display(){
        var str = "";
        var str1 = 0;
        var str2 = 0;
        if(this.goods.length == 0){
            if(this.goods.length == 0){
                var str3 = "";
                str3 = `<p class = "null">
                            <i></i>
                            <span>
                                购物车还是空空的呢，快去看看心怡的商品吧~
                                <a href="shopList.html">去购物></a>
                            </span>
                        </p>`;
                this.dd.html(str3);
            }
        }else{
            this.res.forEach((resVal)=>{
                this.goods.forEach((goodsVal)=>{
                    if(resVal.goodsid == goodsVal.id){
                        // console.log(parseInt(resVal.price.slice(1,resVal.price.length-1)))
                        str += `<dd myindex = "${resVal.goodsid}">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="" id="check">
                                            <img src="${resVal.url}" >
                                            <span>${resVal.name}</span>
                                        </li>
                                        <li>${resVal.price}</li>
                                        <li><input type="number" min = 1 max = "${resVal.num}" name="" id="num" value = "${goodsVal.num}"></li>
                                        <li>${parseInt(resVal.price.slice(1,resVal.price.length-1))*goodsVal.num}</li>
                                        <li class = "del">删除</li>
                                    </ul>
                                </dd>`;
                    }
                })
            })
            var that = this;
            $(document).on("click", "#check", function(){
                var mynum = $(this).parent().nextAll().children("#num").val();
                var myprice = $(this).parent().nextAll().html();
                myprice = myprice.slice(1, myprice.length-1)
                if($(this).is(":checked")) that.status = 1;
                if(!$(this).is(":checked")) that.status = 0;
                // console.log(that.status);
                if(that.status == 1){
                    str1 += parseInt(mynum);
                    str2 += parseInt(mynum)*parseInt(myprice);
                }
                console.log(str1);
                that.box1.html(str1);
                that.box2.html(str2);       
            })
            this.dd.html(str);
            this.box3.html(str1);
        }
    }

    addRemove(){
        var that = this;
        $(document).on("click", ".del" ,function(){
            // console.log($(this).parent().parent().attr("myindex"));
            that.index = $(this).parent().parent().attr("myindex");
            $(this).parent().parent().remove();
            that.changeCookie(function(i){
                that.goods.splice(i,1);
            });
        })
        
        $(document).on("input", "#num", function(){
            var _this = this;
            that.index = $(this).parent().parent().parent().attr("myindex");
            that.changeCookie(function(i){
                that.goods[i].num = $(_this).val();
                // console.log($(_this).val())
            })
        })
    }

    changeCookie(callback){
        var i;
        this.goods.some((val, index)=>{
            i = index;
            return val.id == this.index;
        })
        callback(i);
        setCookie("goods", JSON.stringify(this.goods));
        this.display()
    }
}

new Car();